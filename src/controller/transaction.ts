import { Request, Response } from 'express';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { AssetSend } from 'ddk.registry/dist/model/common/transaction/asset/send';
import { transactionCreator } from 'ddk.registry/dist/service/transaction';
import { TransactionData } from 'ddk.registry/dist/model/common/type';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';

import { socketClient } from 'src/socket';
import { validate } from 'src/util/validate';

export class TransactionController {
    @validate()
    async getById(req: Request, res: Response): Promise<void> {
        const response = await socketClient
            .send<{ id: string }, Transaction<any>>(API_ACTION_TYPES.GET_TRANSACTION, req.params);

        res.send(response);
    }

    @validate()
    async getMany(_req: Request, res: Response): Promise<void> {
        res.send('Method not implemented.');
    }

    @validate()
    async create(req: Request, res: Response): Promise<void> {
        const transactionData: TransactionData = {
            ...req.body.transaction,
            asset: new AssetSend(req.body.transaction.asset),
        };

        const transaction = transactionCreator.create({
            data: transactionData,
            sender: undefined, // TODO: fetch sender from core for vote transaction
            secret: req.body.secret,
        });

        res.send(transaction);
    }
}

export const transactionController = new TransactionController();
