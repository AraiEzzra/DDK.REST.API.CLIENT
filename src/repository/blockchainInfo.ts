export interface IBlockchainInfoRepository {
    airdropBalance: number;
}

export class BlockchainInfoRepository implements IBlockchainInfoRepository {
    airdropBalance: number;

    constructor() {
        this.airdropBalance = 0;
    }
}
