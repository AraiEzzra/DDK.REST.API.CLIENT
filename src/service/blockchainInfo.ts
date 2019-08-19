import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { BlockchainInfoSchema } from 'ddk.registry/dist/model/common/type';

import { SocketClient } from 'src/shared/socket';
import { IBlockchainInfoRepository } from 'src/repository/blockchainInfo';

export class BlockchainInfoService {
    private blockchainInfoRepository: IBlockchainInfoRepository;

    constructor(
        blockchainInfoRepository: IBlockchainInfoRepository,
        socketClient: SocketClient<any, EVENT_TYPES | API_ACTION_TYPES>,
    ) {
        this.blockchainInfoRepository = blockchainInfoRepository;

        // TODO: fetch blockchain info when API will be added to core

        socketClient.addCodeListener(EVENT_TYPES.UPDATE_BLOCKCHAIN_INFO, this.onUpdateBlockchainInfo);
    }

    private onUpdateBlockchainInfo = (info: BlockchainInfoSchema): void => {
        this.blockchainInfoRepository.airdropBalance = info.airdropBalance;
    }
}
