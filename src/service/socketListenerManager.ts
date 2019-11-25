import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { Block } from 'ddk.registry/dist/model/common/block';

import { WebhookAction, WebhookService } from 'src/service/webhook';
import { SystemService } from 'src/service/system';
import { BlockchainService } from 'src/service/blockchain';
import { BlockService } from 'src/service/block';
import { ISocketClient } from 'src/shared/socket';
import { TransactionConfirmationService } from 'src/service/transaction/confirmation';
import { TransactionRepository } from 'src/repository/transaction';
import { BlockRepository } from 'src/repository/block';
import { NodePool, NodePoolAction } from 'src/service/nodePool';
import { Node } from 'src/model/node';

export class SocketListenerManager {
    private readonly systemService: SystemService;
    private readonly blockchainService: BlockchainService;
    private readonly blockService: BlockService;
    private readonly transactionConfirmationService: TransactionConfirmationService;
    private readonly webhookService: WebhookService<WebhookAction | EVENT_TYPES>;
    private readonly transactionRepository: TransactionRepository;
    private readonly blockRepository: BlockRepository;

    constructor(
        systemService: SystemService,
        blockchainService: BlockchainService,
        blockService: BlockService,
        transactionConfirmationService: TransactionConfirmationService,
        webhookService: WebhookService<WebhookAction | EVENT_TYPES>,
        transactionRepository: TransactionRepository,
        blockRepository: BlockRepository,
        nodePool: NodePool,
    ) {
        this.systemService = systemService;
        this.blockchainService = blockchainService;
        this.blockService = blockService;
        this.transactionConfirmationService = transactionConfirmationService;
        this.webhookService = webhookService;
        this.transactionRepository = transactionRepository;
        this.blockRepository = blockRepository;

        this.addListeners = this.addListeners.bind(this);

        nodePool.on(NodePoolAction.repick, (node: Node) => {
            this.addListeners(node.socket);
        });
    }

    private addWebhookServiceListeners(socket: ISocketClient<string>) {
        socket.addCodeListener(EVENT_TYPES.DECLINE_TRANSACTION, (transaction: Transaction<any>) => {
            this.webhookService.on(EVENT_TYPES.DECLINE_TRANSACTION, transaction);
        });

        socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, (block: Block) => {
            this.webhookService.on(EVENT_TYPES.APPLY_BLOCK, block);

            block.transactions.forEach(transaction => {
                this.webhookService.on(WebhookAction.APPLY_TRANSACTION, transaction);
            });
        });
    }

    private addBlockServiceListeners(socket: ISocketClient<string>) {
        socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, this.blockService.onApplyBlock);
    }

    private addTransactionConfirmationServiceListeners(socket: ISocketClient<string>) {
        socket.addCodeListener(EVENT_TYPES.DECLINE_TRANSACTION, (transaction: Transaction<any>) => {
            this.transactionConfirmationService.unsubscribe(transaction.id);
        });

        socket.addCodeListener(
            EVENT_TYPES.APPLY_BLOCK,
            (block: Block) => this.transactionConfirmationService.onApplyBlock(block),
        );
    }

    private addSystemServiceListeners(socket: ISocketClient<string>) {
        socket.addCodeListener(EVENT_TYPES.UPDATE_SYSTEM_INFO, this.systemService.onUpdateInfo);
    }

    private addBlockchainServiceListeners(socket: ISocketClient<string>) {
        socket.addCodeListener(EVENT_TYPES.UPDATE_BLOCKCHAIN_INFO, this.blockchainService.onUpdateInfo);
    }

    addListeners(socket: ISocketClient<string>) {
        this.addWebhookServiceListeners(socket);
        this.addBlockServiceListeners(socket);
        this.addTransactionConfirmationServiceListeners(socket);
        this.addSystemServiceListeners(socket);
        this.addBlockchainServiceListeners(socket);

        // TODO: Refactor it
        socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, (block: Block) => {
            block.transactions.forEach(transaction => {
                if (this.transactionRepository.has(transaction.id)) {
                    this.transactionRepository.update(transaction);
                } else {
                    this.transactionRepository.add(transaction);
                }
            });
        });

        socket.addCodeListener(EVENT_TYPES.APPLY_BLOCK, (block: Block) => {
            this.blockRepository.add(block);
        });

        socket.addCodeListener(EVENT_TYPES.UNDO_BLOCK, (block: Block) => {
            this.blockRepository.remove(block.id);
        });

        socket.addCodeListener(EVENT_TYPES.UNDO_BLOCK, (block: Block) => {
            block.transactions.forEach(transaction => {
                this.transactionRepository.remove(transaction.id);
            });
        });
    }
}
