import { Request, Response } from 'express';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { transactionCreator } from 'ddk.registry/dist/service/transaction';
import { TransactionData } from 'ddk.registry/dist/model/common/type';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { transactionSerializer } from 'ddk.registry/dist/util/serialize/transaction';

import { socketClient } from 'src/socket';
import { validate } from 'src/util/validate';
import { calculateAsset } from 'src/service/transaction';
import { fetchAccountBySecret } from 'src/service/account';

export class TransactionController {
    @validate
    async getById(req: Request, res: Response): Promise<void> {
        const response = await socketClient
            .send<{ id: string }, Transaction<any>>(API_ACTION_TYPES.GET_TRANSACTION, req.params);

        res.send(response);
    }

    @validate
    async getMany(req: Request, res: Response): Promise<void> {
        const response = await socketClient.send(
            API_ACTION_TYPES.GET_TRANSACTIONS,
            req.body,
        );

        res.send(response);
    }

    @validate
    async create(req: Request, res: Response): Promise<Response> {
        const transactionData: TransactionData = {
            ...req.body.transaction,
            asset: req.body.transaction.asset,
        };

        let accountResponse = await fetchAccountBySecret(req.body.secret);
        if (!accountResponse.success) {
            return res.send(accountResponse);
        }

        const sender = accountResponse.data;
        const assetResponse = await calculateAsset(transactionData, sender);
        if (!assetResponse.success) {
            res.send(assetResponse);
        }

        transactionData.asset = assetResponse.data;
        const transactionResponse = transactionCreator.create({
            data: transactionData,
            sender,
            secret: req.body.secret,
        });

        if (!transactionResponse.success) {
            res.send(transactionResponse);
        }

        const serializedTransaction = transactionSerializer.serialize(transactionResponse.data);

        return res.send(
            await socketClient.send(API_ACTION_TYPES.CREATE_PREPARED_TRANSACTION, serializedTransaction),
        );
    }
}

export const transactionController = new TransactionController();
