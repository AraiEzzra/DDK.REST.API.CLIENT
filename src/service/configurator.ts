import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { Block } from 'ddk.registry/dist/model/common/block';

import { ON_APPLY_TRANSACTION, ON_APPLY_BLOCK, ON_DECLINE_TRANSACTION } from 'src/config';
import { WebhookAction, WebhookService } from 'src/service/webhook';
import { transactionRepository, blockRepository } from 'src/repository';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { SocketClient } from 'src/shared/socket';
import { TransactionConfirmationService } from 'src/service/transaction/confirmation';

export const configureWebhooks = (webhookService: WebhookService<any>): WebhookService<any> => {
    if (ON_APPLY_TRANSACTION) {
        ON_APPLY_TRANSACTION.split(',').forEach(url => {
            webhookService.subscribe(WebhookAction.APPLY_TRANSACTION, url);
            console.log(`[Configurator][Webhook]: ON_APPLY_TRANSACTION: ${url}`);
        });
    }

    if (ON_APPLY_BLOCK) {
        ON_APPLY_BLOCK.split(',').forEach(url => {
            webhookService.subscribe(EVENT_TYPES.APPLY_BLOCK, url);
            console.log(`[Configurator][Webhook]: ON_APPLY_BLOCK: ${url}`);
        });
    }

    if (ON_DECLINE_TRANSACTION) {
        ON_DECLINE_TRANSACTION.split(',').forEach(url => {
            webhookService.subscribe(EVENT_TYPES.DECLINE_TRANSACTION, url);
            console.log(`[Configurator][Webhook]: ON_DECLINE_TRANSACTION: ${url}`);
        });
    }

    return webhookService;
};

export const configureSocketListeners = (socketClient: SocketClient<any, any>) => {
    socketClient.addCodeListener(EVENT_TYPES.APPLY_BLOCK, (block: Block) => {
        block.transactions.forEach(transaction => {
            if (transactionRepository.has(transaction.id)) {
                transactionRepository.update(transaction);

                if (!blockRepository.has(block.id)) {
                    blockRepository.add(block);
                }
            }
        });
    });
};

export const configureTransactionConfirmationService = (
    service: TransactionConfirmationService,
    socketClient: SocketClient<any, any>,
) => {
    socketClient.addCodeListener(EVENT_TYPES.DECLINE_TRANSACTION, (transaction: Transaction<any>) => {
        service.unsubscribe(transaction.id);
    });

    socketClient.addCodeListener(
        EVENT_TYPES.APPLY_BLOCK,
        (block: Block) => service.onApplyBlock(block),
    );
};
