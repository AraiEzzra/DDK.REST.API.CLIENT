import { Request, Response } from 'express';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { slotService } from 'ddk.registry/dist/service/slot';
import { transactionCreator } from 'ddk.registry/dist/service/transaction';
import { TransactionData } from 'ddk.registry/dist/model/common/type';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { transactionSerializer } from 'ddk.registry/dist/util/serialize/transaction';
import { Account } from 'ddk.registry/dist/model/common/account';
import { TransactionType } from 'ddk.registry/dist/model/common/transaction/type';
import TimeServiceClient from 'eska-common/dist/time_service';

import { socketClient } from 'src/service/socket';
import { validate } from 'src/util/validate';
import { calculateAsset } from 'src/service/transaction';
import { accountService } from 'src/service';

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
        const currentTime = await TimeServiceClient.getTime();
        const epochTime = slotService.getTime(currentTime);

        const transactionData: TransactionData = {
            ...req.body.transaction,
            createdAt: epochTime,
            asset: req.body.transaction.asset,
        };

        let sender: Account;
        switch (transactionData.type) {
            case TransactionType.STAKE:
            case TransactionType.VOTE:
                let accountResponse = await accountService.fetchBySecret(req.body.secret);
                if (!accountResponse.success) {
                    return res.send(accountResponse);
                }

                sender = accountResponse.data;
                break;
            default:
                break;
        }

        const assetResponse = await calculateAsset(transactionData, sender);
        if (!assetResponse.success) {
            res.send(assetResponse);
        }

        transactionData.asset = assetResponse.data;
        const transactionResponse = transactionCreator.create({
            data: transactionData,
            sender,
            secret: req.body.secret,
            secondSecret: req.body.secondSecret,
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
