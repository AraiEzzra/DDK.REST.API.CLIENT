import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';

import { socketClient } from 'src/service/socket';
import { blockchainInfoRepository } from 'src/repository/blockchainInfo';
import { blockRepository } from 'src/repository/block';
import { BlockchainInfoService } from 'src/service/blockchainInfo';
import { BlockService } from 'src/service/block';
import { AccountService } from 'src/service/account';
import { WebhookService, WebhookAction } from 'src/service/webhook';
import { configureWebhooks } from 'src/service/configurator';

export const blockService = new BlockService(blockRepository, socketClient);
export const blockchainInfoService = new BlockchainInfoService(blockchainInfoRepository, socketClient);
export const accountService = new AccountService();
export const webhookService = new WebhookService<WebhookAction | EVENT_TYPES>();

configureWebhooks(webhookService);
