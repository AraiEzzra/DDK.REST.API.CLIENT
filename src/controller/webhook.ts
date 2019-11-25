import { Request, Response } from 'express';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import fetch from 'node-fetch';

import { transactionConfirmationService, nodePool } from 'src/service';
import { validate } from 'src/util/validate';
import { HTTP_STATUS } from 'src/util/http';
import { NUMBER_OF_CONFIRMATIONS } from 'src/config';
import { transactionRepository } from 'src/repository';

export class WebhookController {
    @validate
    async onConfirmTransaction(req: Request, res: Response): Promise<Response> {
        const response = await nodePool
            .send<{ id: string }, Transaction<any>>(API_ACTION_TYPES.GET_TRANSACTION, {
                id: req.body.transactionId,
            });

        if (!response.success) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .send(response);
        }

        if (response.data) {
            if (response.data.confirmations >= NUMBER_OF_CONFIRMATIONS) {
                fetch(req.body.url, { method: 'post', body: JSON.stringify(response.data) });

                return res.send({ success: true });
            }
            if (response.data.blockId) {
                transactionRepository.update(response.data);
            }
        }

        transactionConfirmationService.subscribe(req.body);

        return res.send({ success: true });
    }
}

export const webhookController = new WebhookController();
