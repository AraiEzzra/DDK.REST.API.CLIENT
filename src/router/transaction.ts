import express from 'express';

import { transactionController } from 'src/controller/transaction';

export const transactionRouter = express.Router();

transactionRouter.post('/getMany', transactionController.getMany);
transactionRouter.get('/:id', transactionController.getById);
transactionRouter.post('/', transactionController.create);
