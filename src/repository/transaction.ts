import { Transaction, TransactionSchema } from 'ddk.registry/dist/model/common/transaction';
import { TransactionId } from 'ddk.registry/dist/model/common/type';

export interface ITransactionRepository {
    add(transaction: TransactionSchema<any>): void;
    get(id: string): TransactionSchema<any>;
    has(id: string): boolean;
    remove(id: string): boolean;
}

export class TransactionRepository implements ITransactionRepository {
    private readonly transactions: Map<TransactionId, Transaction<any>>;

    constructor() {
        this.transactions = new Map<TransactionId, Transaction<any>>();

        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.has = this.has.bind(this);
    }

    add(transaction: Transaction<any>): void {
        if (!this.transactions.has(transaction.id)) {
            this.transactions.set(transaction.id, transaction);
        }
    }

    update(transaction: Transaction<any>): void {
        this.transactions.set(transaction.id, transaction);
    }

    get(transactionId: TransactionId): Transaction<any> {
        return this.transactions.get(transactionId);
    }

    has(transactionId: TransactionId): boolean {
        return this.transactions.has(transactionId);
    }

    remove(id: string): boolean {
        return this.transactions.delete(id);
    }
}
