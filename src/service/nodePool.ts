import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { Block } from 'ddk.registry/dist/model/common/block';

import { Node } from 'src/model/node';
import { SocketListenerManager } from 'src/service/socketListenerManager';

export class NodePool {
    private readonly socketListenerManager: SocketListenerManager;
    private readonly nodes: Array<Node>;
    private readonly compareNodes: (a: Node, b: Node) => number;
    private readonly nodeSwitchHeightThreshold: number = 3;
    private primary: Node;

    constructor(
        nodes: Array<Node>,
        compareNodes: (a: Node, b: Node) => number,
        socketListenerManager: SocketListenerManager,
    ) {
        this.nodes = nodes;
        this.compareNodes = compareNodes;
        this.socketListenerManager = socketListenerManager;

        this.onDisconnect = this.onDisconnect.bind(this);
        this.onApplyBlock = this.onApplyBlock.bind(this);

        this.nodes.forEach(node => node.socket.on('disconnect', (_reason: string) => {
            this.onDisconnect(node);
        }));
        this.nodes.forEach(node => node.socket.on('connect_timeout', (_timeout: number) => {
            this.onDisconnect(node);
        }));

        this.nodes.forEach(node => {
            node.socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, this.onApplyBlock);

            // TODO: fix removing listeners
            node.socket.on('reconnect', () => {
                node.socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, this.onApplyBlock);
            });
        });
    }

    private onApplyBlock(block: Block) {
        if (!this.primary) {
            return;
        }

        if (this.primary.height + this.nodeSwitchHeightThreshold <= block.height) {
            this.repickPrimary();
        }
    }

    private onDisconnect(node: Node) {
        if (!this.primary) {
            return;
        } else if (node.socket.uri === this.primary.socket.uri) {
            this.repickPrimary();
        }
    }

    async send<Data, Response>(code: API_ACTION_TYPES | EVENT_TYPES, data: Data): Promise<ResponseEntity<Response>> {
        if (!this.nodes.filter(node => node.socket.isConnected).length) {
            return new ResponseEntity({ errors: ['All nodes are disconnected. Please try again later.'] });
        } else if (!this.primary) {
            console.log(`[NodePool][send] Primary node is missing. Repick`);
            this.repickPrimary();
        }

        const response = await this.primary.socket.send<Data, Response>(code, data);
        if (!response.success) {
            this.repickPrimary();
            return this.send(code, data);
        }

        return response;
    }

    private repickPrimary(): void {
        if (this.primary && this.nodes.length === 1) {
            return;
        } else if (!this.nodes.filter(node => node.socket.isConnected).length) {
            console.log(`[NodePool][repickPrimary] Skip, no active connections`);
            this.primary = undefined;
            return;
        } else if (this.primary) {
            this.primary.socket.removeCodeListeners();
        }

        this.nodes.sort(this.compareNodes);
        this.primary = this.nodes[0];
        this.socketListenerManager.addListeners(this.primary.socket);

        console.log(`[NodePool][repickPrimary] Primary node changed to ${this.primary.socket.uri}`);
    }
}
