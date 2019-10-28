import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { BlockchainInfoSchema } from 'ddk.registry/dist/model/common/type';

import { SocketClient } from 'src/shared/socket';
import { IBlockchainRepository } from 'src/repository/blockchain';

export class BlockchainService {
    private repository: IBlockchainRepository;

    constructor(
        blockchainRepository: IBlockchainRepository,
        socketClient: SocketClient<any, EVENT_TYPES | API_ACTION_TYPES>,
    ) {
        this.repository = blockchainRepository;

        // TODO: fetch blockchain info when API will be added to core

        socketClient.addCodeListener(EVENT_TYPES.UPDATE_BLOCKCHAIN_INFO, this.onUpdateInfo);
    }

    private onUpdateInfo = (info: BlockchainInfoSchema): void => {
        this.repository.updateInfo(info);
    }
}
