import { Request, Response } from 'express';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { TransactionData } from 'ddk.registry/dist/model/common/type';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';

import { socketClient } from 'src/service/socket';
import { validate } from 'src/util/validate';
import { transactionService } from 'src/service';
import { transactionRepository } from 'src/repository';

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

        const transactionResponse = await transactionService
            .create(transactionData, req.body.secret, req.body.secondSecret);

        if (transactionResponse.success) {
            transactionRepository.add(transactionResponse.data);
        }

        return res.send(transactionResponse);
    }
}

export const transactionController = new TransactionController();
