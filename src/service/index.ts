import { socketClient } from 'src/service/socket';
import { blockchainInfoRepository } from 'src/repository/blockchainInfo';
import { blockRepository } from 'src/repository/block';
import { BlockchainInfoService } from 'src/service/blockchainInfo';
import { BlockService } from 'src/service/block';
import { AccountService } from 'src/service/account';
import { WebhookService, WebhookAction } from 'src/service/webhook';
import { ON_APPLY_TRANSACTION, ON_APPLY_BLOCK } from 'src/config';
import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';

export const blockService = new BlockService(blockRepository, socketClient);
export const blockchainInfoService = new BlockchainInfoService(blockchainInfoRepository, socketClient);
export const accountService = new AccountService();
export const webhookService = new WebhookService<WebhookAction | EVENT_TYPES>();

if (ON_APPLY_TRANSACTION) {
    ON_APPLY_TRANSACTION.split(',').forEach(url => {
        webhookService.subscribe(WebhookAction.APPLY_TRANSACTION, url);
        console.log(`Webhook: ON_APPLY_TRANSACTION: ${url}`);
    });
}
if (ON_APPLY_BLOCK) {
    ON_APPLY_BLOCK.split(',').forEach(url => {
        webhookService.subscribe(EVENT_TYPES.APPLY_BLOCK, url);
        console.log(`Webhook: ON_APPLY_BLOCK: ${url}`);
    });
}
