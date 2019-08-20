export interface IBlockchainInfoRepository {
    airdropBalance: number;
}

class BlockchainInfoRepository implements IBlockchainInfoRepository {
    airdropBalance: number;

    constructor() {
        this.airdropBalance = 0;
    }
}

export const blockchainInfoRepository = new BlockchainInfoRepository();
