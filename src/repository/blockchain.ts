
import { BlockchainInfoSchema } from 'ddk.registry/dist/model/common/type';

export interface IBlockchainRepository {
    getInfo(): BlockchainInfoSchema;
    updateInfo(info: BlockchainInfoSchema): void;
}

export class BlockchainRepository implements IBlockchainRepository {
    private info: BlockchainInfoSchema;

    constructor() {
        this.info = {
            airdropBalance: 0,
            totalSupply: 0,
            circulatingSupply: 0,
            tokenHolders: 0,
            totalStakeAmount: 0,
            totalStakeHolders: 0,
            transactionsCount: 0,
        };
    }

    getInfo(): BlockchainInfoSchema {
        return this.info;
    }

    updateInfo(info: BlockchainInfoSchema): void {
        this.info = info;
    }
}
