import { BlockId } from 'ddk.registry/dist/model/common/type';
import { Block } from 'ddk.registry/dist/model/common/block';

export interface IBlockRepository {
    lastBlockHeight: number;
}

export class BlockRepository implements IBlockRepository {
    private readonly blocks: Map<BlockId, Block>;

    lastBlockHeight: number;

    constructor() {
        this.blocks = new Map<BlockId, Block>();

        this.lastBlockHeight = 0;
    }

    add(block: Block): void {
        if (!this.blocks.has(block.id)) {
            this.blocks.set(block.id, block);
        }
    }

    get(blockId: BlockId): Block {
        return this.blocks.get(blockId);
    }

    has(blockId: BlockId): boolean {
        return this.blocks.has(blockId);
    }
}
