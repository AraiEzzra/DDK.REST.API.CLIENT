import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { TransactionId } from 'ddk.registry/dist/model/common/type';

export class TransactionRepository {
    private readonly transactions: Map<TransactionId, Transaction<any>>;

    constructor() {
        this.transactions = new Map<TransactionId, Transaction<any>>();
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
}
