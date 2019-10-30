import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { Block } from 'ddk.registry/dist/model/common/block';

import { ISocketClient } from 'src/shared/socket';

export class Node {
    private blockchain: {
        height: number;
    };
    socket: ISocketClient<API_ACTION_TYPES | EVENT_TYPES>;

    constructor(socket: ISocketClient<API_ACTION_TYPES | EVENT_TYPES>) {
        this.blockchain = {
            height: 0,
        };
        this.socket = socket;

        this.onApplyBlock = this.onApplyBlock.bind(this);
        this.onUndoBlock = this.onUndoBlock.bind(this);

        this.socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, this.onApplyBlock);
        this.socket.addCodeListener(EVENT_TYPES.UNDO_BLOCK, this.onUndoBlock);

        // FIXME: removeCodeListeners removes all listeners after disconnect
        // but, need remove only specific listeners
        this.socket.on('reconnect', () => {
            this.socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, this.onApplyBlock);
            this.socket.addCodeListener(EVENT_TYPES.UNDO_BLOCK, this.onUndoBlock);
        });
    }

    private onApplyBlock(block: Block) {
        this.blockchain.height = block.height;
    }

    private onUndoBlock(block: Block) {
        this.blockchain.height = block.height - 1;
    }

    get height(): number {
        return this.blockchain.height;
    }
}

const nodeSortByConnect = (a: Node, b: Node): number => {
    if (!a.socket.isConnected && b.socket.isConnected) {
        return 1;
    }
    if (a.socket.isConnected && !b.socket.isConnected) {
        return -1;
    }
    return 0;
};

const nodeSortByHeightASC = (a: Node, b: Node): number => {
    if (a.height < b.height) {
        return -1;
    }
    if (a.height > b.height) {
        return 1;
    }
    return 0;
};

export const nodeSort = (a: Node, b: Node): number => {
    let result = nodeSortByConnect(a, b);
    if (result) {
        return result;
    }

    return nodeSortByHeightASC(a, b) * -1;
};
