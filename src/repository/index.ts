import { BlockRepository } from 'src/repository/block';
import { BlockchainInfoRepository } from 'src/repository/blockchainInfo';
import { TransactionRepository } from 'src/repository/transaction';

export const blockRepository = new BlockRepository();
export const blockchainInfoRepository = new BlockchainInfoRepository();
export const transactionRepository = new TransactionRepository();
