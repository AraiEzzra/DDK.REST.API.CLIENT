import timeService from 'eska-common/dist/time_service';
import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { slotService } from 'ddk.registry/dist/service/slot';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';

import {
    blockchainRepository,
    blockRepository,
    transactionRepository,
    systemRepository,
} from 'src/repository';
import { BlockchainService } from 'src/service/blockchain';
import { BlockService } from 'src/service/block';
import { AccountService } from 'src/service/account';
import { WebhookService, WebhookAction } from 'src/service/webhook';
import { configureWebhooks } from 'src/service/configurator';
import { TransactionConfirmationService } from 'src/service/transaction/confirmation';
import { NUMBER_OF_CONFIRMATIONS, NODE_HOSTS } from 'src/config';
import { TransactionService } from 'src/service/transaction';
import { SystemService } from 'src/service/system';
import { initSocketIOClient } from 'src/service/socket';
import { SocketIOClient } from 'src/shared/socketIOClient';
import { NodePool } from 'src/service/nodePool';
import { Node } from 'src/model/node';
import { SocketListenerManager } from 'src/service/socketListenerManager';
import { nodeComparator } from 'src/util/сomparator/node';

export const blockService = new BlockService(blockRepository);
export const blockchainService = new BlockchainService(blockchainRepository);
export const systemService = new SystemService(systemRepository);
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
);
export const socketListenerManager = new SocketListenerManager(
    systemService,
    blockchainService,
    blockService,
    transactionConfirmationService,
    webhookService,
    transactionRepository,
    blockRepository,
);

const nodes = NODE_HOSTS
    .map(host => initSocketIOClient(host.ip, host.port))
    .map(socket => new SocketIOClient<API_ACTION_TYPES | EVENT_TYPES>(socket))
    .map(socket => new Node(socket));
export const nodePool = new NodePool(nodes, nodeComparator, socketListenerManager);

configureWebhooks(webhookService);
