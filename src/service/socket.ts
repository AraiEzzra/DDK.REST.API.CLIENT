import io from 'socket.io-client';

import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { Block } from 'ddk.registry/dist/model/common/block';

import { DEFAULT_SSL_PORT } from 'src/const';
import { SocketClient } from 'src/shared/socket';
import { webhookService } from 'src/service';
import { WebhookAction } from 'src/service/webhook';
import { NODE_API_PORT, NODE_HOST } from 'src/config';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';

const initSocketIOClient = (ip: string, port: number): SocketIOClient.Socket => {
    const protocol = port === DEFAULT_SSL_PORT ? 'wss' : 'ws';

    console.log(`Socket connecting to ${protocol}://${NODE_HOST}:${NODE_API_PORT}`);

    return io(`${protocol}://${ip}:${port}`);
};

const socketIOClient = initSocketIOClient(NODE_HOST, NODE_API_PORT);

export const socketClient = new SocketClient<SocketIOClient.Socket, API_ACTION_TYPES | EVENT_TYPES>(socketIOClient);

socketClient.addCodeListener(EVENT_TYPES.APPLY_BLOCK, (block: Block) => {
    console.log(`APPLY BLOCK EVENT: ${JSON.stringify(block)}`);

    webhookService.on(EVENT_TYPES.APPLY_BLOCK, block);

    block.transactions.forEach(transaction => {
        webhookService.on(WebhookAction.APPLY_TRANSACTION, transaction);
    });
});

socketClient.addCodeListener(EVENT_TYPES.DECLINE_TRANSACTION, (transaction: Transaction<any>) => {
    webhookService.on(EVENT_TYPES.DECLINE_TRANSACTION, transaction);
});
