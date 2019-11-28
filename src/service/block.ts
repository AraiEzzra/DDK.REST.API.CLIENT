import { BlockSchema } from 'ddk.registry/dist/model/common/block';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';

import { IBlockRepository } from 'src/repository/block';
import { NodePool } from 'src/service/nodePool';

export interface IBlockService {
    onApplyBlock(block: BlockSchema): void;

    add(block: BlockSchema): void;
    get(id: string): Promise<BlockSchema>;
}

export class BlockService {
    private repository: IBlockRepository;
    private nodePool: NodePool;

    constructor(
        repository: IBlockRepository,
        nodePool: NodePool,
    ) {
        this.repository = repository;
        this.nodePool = nodePool;

        this.onApplyBlock = this.onApplyBlock.bind(this);
    }

    onApplyBlock(block: BlockSchema): void {
        this.repository.lastBlockHeight = block.height;
    }

    add(block: BlockSchema): void {
        this.repository.add(block);
    }

    async get(id: string): Promise<BlockSchema> {
        if (this.repository.has(id)) {
            return this.repository.get(id);
        }

        const response = await this.nodePool.send<{ id: string }, BlockSchema>(API_ACTION_TYPES.GET_BLOCK, { id });
        if (!response.success) {
            return null;
        }

        return response.data;
    }
}
