import { BlockchainInfoSchema } from 'ddk.registry/dist/model/common/type';

import { IBlockchainRepository } from 'src/repository/blockchain';

export class BlockchainService {
    private repository: IBlockchainRepository;

    constructor(
        blockchainRepository: IBlockchainRepository,
    ) {
        this.repository = blockchainRepository;

        // TODO: fetch blockchain info when API will be added to core
    }

    onUpdateInfo = (info: BlockchainInfoSchema): void => {
        this.repository.updateInfo(info);
    }
}
