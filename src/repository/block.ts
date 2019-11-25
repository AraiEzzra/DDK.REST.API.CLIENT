import { BlockId } from 'ddk.registry/dist/model/common/type';
import { BlockSchema } from 'ddk.registry/dist/model/common/block';

export interface IBlockRepository {
    lastBlockHeight: number;

    add(block: BlockSchema): void;
    get(blockId: BlockId): BlockSchema;
    has(blockId: BlockId): boolean;
    remove(id: string): boolean;
}

export class BlockRepository implements IBlockRepository {
    private readonly blocks: Map<BlockId, BlockSchema>;

    lastBlockHeight: number;

    constructor() {
        this.blocks = new Map<BlockId, BlockSchema>();

        this.lastBlockHeight = 0;
    }

    add(block: BlockSchema): void {
        if (!this.blocks.has(block.id)) {
            this.blocks.set(block.id, block);
        }
    }

    get(id: BlockId): BlockSchema {
        return this.blocks.get(id);
    }

    has(id: BlockId): boolean {
        return this.blocks.has(id);
    }

    remove(id: string): boolean {
        return this.blocks.delete(id);
    }
}
