import { BlockRepository } from 'src/repository/block';
import { BlockchainInfoRepository } from 'src/repository/blockchainInfo';
import { TransactionRepository } from 'src/repository/transaction';
import { SystemInfoRepository } from 'src/repository/systemInfo';

export const blockRepository = new BlockRepository();
export const blockchainInfoRepository = new BlockchainInfoRepository();
export const systemInfoRepository = new SystemInfoRepository();
export const transactionRepository = new TransactionRepository();
