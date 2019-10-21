
import { BlockchainInfoSchema } from 'ddk.registry/dist/model/common/type';

export interface IBlockchainInfoRepository extends BlockchainInfoSchema {
    get(): BlockchainInfoSchema;
    update(info: BlockchainInfoSchema): void;
}

export class BlockchainInfoRepository implements IBlockchainInfoRepository {
    airdropBalance: number;
    totalSupply: number;
    circulatingSupply: number;
    tokenHolders: number;
    totalStakeAmount: number;
    totalStakeHolders: number;
    transactionsCount: number;

    constructor() {
        this.airdropBalance = 0;
        this.totalSupply = 0;
        this.circulatingSupply = 0;
        this.tokenHolders = 0;
        this.totalStakeAmount = 0;
        this.totalStakeHolders = 0;
        this.transactionsCount = 0;
    }

    get(): BlockchainInfoSchema {
        return {
            airdropBalance: this.airdropBalance,
            totalSupply: this.totalSupply,
            circulatingSupply: this.circulatingSupply,
            tokenHolders: this.tokenHolders,
            totalStakeAmount: this.totalStakeAmount,
            totalStakeHolders: this.totalStakeHolders,
            transactionsCount: this.transactionsCount,
        };
    }

    update(info: BlockchainInfoSchema): void {
        this.airdropBalance = info.airdropBalance;
        this.totalSupply = info.totalSupply;
        this.circulatingSupply = info.circulatingSupply;
        this.tokenHolders = info.tokenHolders;
        this.totalStakeAmount = info.totalStakeAmount;
        this.totalStakeHolders = info.totalStakeHolders;
        this.transactionsCount = info.transactionsCount;
    }
}
