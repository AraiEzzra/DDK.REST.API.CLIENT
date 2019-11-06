import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { Asset } from 'ddk.registry/dist/model/common/transaction/asset';
import { SerializedTransaction } from 'ddk.registry/dist/model/common/transaction/type';
import { RawTransaction } from 'ddk.registry/dist/model/common/type';

export interface TransactionSerializer {
    serialize(trs: Transaction<Asset>): SerializedTransaction;
    deserialize(rawTrs: RawTransaction): Transaction<Asset>;
}
