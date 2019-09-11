import timeService from 'eska-common/dist/time_service';
import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { slotService } from 'ddk.registry/dist/service/slot';
import { transactionSerializer } from 'ddk.registry/dist/util/serialize/transaction';

import { socketClient } from 'src/service/socket';
import { blockchainInfoRepository, blockRepository, transactionRepository } from 'src/repository';
import { BlockchainInfoService } from 'src/service/blockchainInfo';
import { BlockService } from 'src/service/block';
import { AccountService } from 'src/service/account';
import { WebhookService, WebhookAction } from 'src/service/webhook';
import {
    configureWebhooks,
    configureSocketListeners,
    configureTransactionConfirmationService,
} from 'src/service/configurator';
import { TransactionConfirmationService } from 'src/service/transaction/confirmation';
import { NUMBER_OF_CONFIRMATIONS } from 'src/config';
import { TransactionService } from 'src/service/transaction';

export const blockService = new BlockService(blockRepository, socketClient);
export const blockchainInfoService = new BlockchainInfoService(blockchainInfoRepository, socketClient);
export const accountService = new AccountService();
export const webhookService = new WebhookService<WebhookAction | EVENT_TYPES>();
export const transactionConfirmationService = new TransactionConfirmationService(
    transactionRepository,
    blockRepository,
    NUMBER_OF_CONFIRMATIONS,
);
export const transactionService = new TransactionService(
    slotService,
    timeService,
    accountService,
    socketClient,
    transactionSerializer,
);

configureWebhooks(webhookService);
configureSocketListeners(socketClient);
configureTransactionConfirmationService(transactionConfirmationService, socketClient);
