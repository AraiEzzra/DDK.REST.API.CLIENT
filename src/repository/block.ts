export interface IBlockRepository {
    lastBlockHeight: number;
}

class BlockRepository implements IBlockRepository {
    lastBlockHeight: number;

    constructor() {
        this.lastBlockHeight = 0;
    }
}

export const blockRepository = new BlockRepository();
