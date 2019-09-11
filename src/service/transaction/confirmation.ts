import fetch from 'node-fetch';
import { Block } from 'ddk.registry/dist/model/common/block';

import { TransactionRepository } from 'src/repository/transaction';
import { BlockRepository } from 'src/repository/block';
import { TransactionId } from 'ddk.registry/dist/model/common/type';

export type TransactionConfirmationListener = {
    transactionId: TransactionId,
    url: string,
};

export class TransactionConfirmationService {
    private readonly transactionRepository: TransactionRepository;
    private readonly blockRepository: BlockRepository;
    private readonly numberOfConfirmations: number;
    private readonly listeners: Array<TransactionConfirmationListener>;

    constructor(
        transactionRepository: TransactionRepository,
        blockRepository: BlockRepository,
        numberOfConfirmations: number,
    ) {
        this.numberOfConfirmations = numberOfConfirmations;
        this.transactionRepository = transactionRepository;
        this.blockRepository = blockRepository;
        this.listeners = [];

        this.unsubscribe = this.unsubscribe.bind(this);
        this.onApplyBlock = this.onApplyBlock.bind(this);
    }

    subscribe(data: TransactionConfirmationListener) {
        this.listeners.push(data);
    }

    unsubscribe(transactionId: string) {
        const index = this.listeners.findIndex(listener => listener.transactionId === transactionId);
        if (index === -1) {
            return;
        }

        this.listeners.splice(index, 1);
    }

    onApplyBlock(block: Block) {
        const notifiedTransactionIds: Array<TransactionId> = [];

        this.listeners.forEach(listener => {
            const transaction = this.transactionRepository.get(listener.transactionId);
            if (!transaction) {
                console.error(`[DDK][RestAPI][TransactionConfirmationService][onApplyBlock] ` +
                    `The listening transaction is missing in transaction repository`);
                return;
            }

            if (!transaction.blockId) {
                // The transaction is not applied yet
                return;
            }

            const transactionBlock = this.blockRepository.get(transaction.blockId);
            if (!transactionBlock) {
                console.error(`[DDK][RestAPI][TransactionConfirmationService][onApplyBlock] ` +
                    `Listening transaction block is missing in transaction repository`);
                return;
            }

            if (transactionBlock.height + this.numberOfConfirmations > block.height) {
                return;
            }

            transaction.confirmations = block.height - transactionBlock.height;

            fetch(listener.url, { method: 'post', body: JSON.stringify(transaction) });

            notifiedTransactionIds.push(listener.transactionId);
        });

        notifiedTransactionIds.forEach(this.unsubscribe);
    }
}
