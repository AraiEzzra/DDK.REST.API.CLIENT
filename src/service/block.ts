import { BlockSchema } from 'ddk.registry/dist/model/common/block';

import { IBlockRepository } from 'src/repository/block';

export class BlockService {
    private repository: IBlockRepository;

    constructor(
        blockRepository: IBlockRepository,
    ) {
        this.repository = blockRepository;
    }

    onApplyBlock = (block: BlockSchema): void => {
        this.repository.lastBlockHeight = block.height;
    }
}
