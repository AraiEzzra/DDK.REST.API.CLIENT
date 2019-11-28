import fetch, { Response } from 'node-fetch';
import { setTimeout, clearTimeout } from 'timers';
import { Block } from 'ddk.registry/dist/model/common/block';
import { TransactionId } from 'ddk.registry/dist/model/common/type';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';

import { TransactionRepository } from 'src/repository/transaction';
import { IBlockService } from 'src/service/block';

export type TransactionConfirmationListener = {
    transactionId: TransactionId;
    url: string;
};

type ConfirmationListener = {
    unsubscribeTimeoutId: NodeJS.Timeout;
} & TransactionConfirmationListener;

export interface IConfirmationsService<ID, T> {
    subscribe(data: T): void;
    unsubscribe(id: ID): void;
}

export class TransactionConfirmationService
    implements IConfirmationsService<string, ConfirmationListener> {
    private readonly transactionRepository: TransactionRepository;
    private readonly blockService: IBlockService;
    private readonly numberOfConfirmations: number;
    private readonly listeners: Map<string, Array<ConfirmationListener>>;
    private readonly unsubscribeTimeout: number;

    constructor(
        transactionRepository: TransactionRepository,
        blockService: IBlockService,
        numberOfConfirmations: number,
        unsubscribeTimeout: number = 86400000,
    ) {
        this.numberOfConfirmations = numberOfConfirmations;
        this.transactionRepository = transactionRepository;
        this.blockService = blockService;
        this.unsubscribeTimeout = unsubscribeTimeout;

        this.listeners = new Map();

        this.unsubscribe = this.unsubscribe.bind(this);
        this.onApplyBlock = this.onApplyBlock.bind(this);
    }

    private notify(url: string, transaction: Transaction): Promise<Response> {
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(transaction),
        });
    }

    subscribe(listener: TransactionConfirmationListener) {
        const unsubscribeTimeoutId = setTimeout(
            () => this.unsubscribe(listener.transactionId),
            this.unsubscribeTimeout,
        );

        if (!this.listeners.has(listener.transactionId)) {
            this.listeners.set(listener.transactionId, []);
        }

        this.listeners
            .get(listener.transactionId)
            .push({ ...listener, unsubscribeTimeoutId });
    }

    unsubscribe(id: string) {
        if (!this.listeners.has(id)) {
            return;
        }

        this.listeners
            .get(id)
            .forEach(listener => clearTimeout(listener.unsubscribeTimeoutId));
        this.listeners.delete(id);
    }

    async onApplyBlock(block: Block) {
        const listenedTransactions = block.transactions.filter(transaction =>
            this.listeners.has(transaction.id),
        );

        if (listenedTransactions.length) {
            listenedTransactions.forEach(this.transactionRepository.add);
            this.blockService.add(block);
        }

        const notifiedIds: Array<string> = [];

        for (const [id, listeners] of this.listeners.entries()) {
            const transaction = this.transactionRepository.get(id);
            if (!transaction || !transaction.blockId) {
                return;
            }

            const transactionBlock = await this.blockService.get(
                transaction.blockId,
            );
            if (!transactionBlock) {
                return;
            }

            if (
                transactionBlock.height + this.numberOfConfirmations >
                block.height
            ) {
                return;
            }

            transaction.confirmations = block.height - transactionBlock.height;

            listeners.forEach(listener =>
                this.notify(listener.url, transaction),
            );

            notifiedIds.push(id);
        }

        notifiedIds.forEach(this.unsubscribe);
    }
}
