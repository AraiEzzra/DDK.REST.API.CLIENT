import express from 'express';

import { transactionController } from 'src/controller/transaction';

export const transactionRouter = express.Router();

transactionRouter.get('/', transactionController.getMany);
transactionRouter.get('/:id', transactionController.getById);
transactionRouter.post('/', transactionController.create);
