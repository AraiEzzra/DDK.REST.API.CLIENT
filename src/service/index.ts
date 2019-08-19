import { socketClient } from 'src/socket';
import { blockchainInfoRepository } from 'src/repository/blockchainInfo';
import { blockRepository } from 'src/repository/block';
import { BlockchainInfoService } from 'src/service/blockchainInfo';
import { BlockService } from 'src/service/block';
import { AccountService } from 'src/service/account';

export const blockService = new BlockService(blockRepository, socketClient);
export const blockchainInfoService = new BlockchainInfoService(blockchainInfoRepository, socketClient);
export const accountService = new AccountService();
