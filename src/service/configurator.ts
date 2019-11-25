import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';

import { ON_APPLY_TRANSACTION, ON_APPLY_BLOCK, ON_DECLINE_TRANSACTION } from 'src/config';
import { WebhookAction, ISubscriber } from 'src/service/webhook';
import { parseUrls } from 'src/util/http';

export const configureWebhooks = (webhookService: ISubscriber<any>): void => {
    parseUrls(ON_APPLY_TRANSACTION).forEach(url => {
        webhookService.subscribe(WebhookAction.APPLY_TRANSACTION, url);
        console.log(`[Configurator][Webhook]: ON_APPLY_TRANSACTION: ${url}`);
    });

    parseUrls(ON_APPLY_BLOCK).forEach(url => {
        webhookService.subscribe(EVENT_TYPES.APPLY_BLOCK, url);
        console.log(`[Configurator][Webhook]: ON_APPLY_BLOCK: ${url}`);
    });

    parseUrls(ON_DECLINE_TRANSACTION).forEach(url => {
        webhookService.subscribe(EVENT_TYPES.DECLINE_TRANSACTION, url);
        console.log(`[Configurator][Webhook]: ON_DECLINE_TRANSACTION: ${url}`);
    });
};
