import { BlockSchema } from 'ddk.registry/dist/model/common/block';
import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';

import { IBlockRepository } from 'src/repository/block';
import { SocketClient } from 'src/shared/socket';

export class BlockService {
    private blockRepository: IBlockRepository;

    constructor(
        blockRepository: IBlockRepository,
        socketClient: SocketClient<any, EVENT_TYPES | API_ACTION_TYPES>,
    ) {
        this.blockRepository = blockRepository;

        socketClient.onCode(EVENT_TYPES.APPLY_BLOCK, this.onApplyBlock);
    }

    private onApplyBlock = (block: BlockSchema): void => {
        this.blockRepository.lastBlockHeight = block.height;
    }
}
