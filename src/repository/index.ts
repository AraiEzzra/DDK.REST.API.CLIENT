import { BlockRepository } from 'src/repository/block';
import { BlockchainRepository } from 'src/repository/blockchain';
import { TransactionRepository } from 'src/repository/transaction';
import { SystemRepository } from 'src/repository/system';

export const blockRepository = new BlockRepository();
export const blockchainRepository = new BlockchainRepository();
export const systemRepository = new SystemRepository();
export const transactionRepository = new TransactionRepository();
