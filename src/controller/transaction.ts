import { Request, Response } from 'express';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';

import { socketClient } from 'src/socket';

export class TransactionController {
    constructor() {
    }

    async get(req: Request, res: Response): Promise<void> {
        const response = await socketClient
            .send<{ id: string }, Transaction<any>>(API_ACTION_TYPES.GET_TRANSACTION, req.params);

        res.send(response);
    }
}

export const transactionController = new TransactionController();
