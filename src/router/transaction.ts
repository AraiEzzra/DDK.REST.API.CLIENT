import express from 'express';

import { transactionController } from 'src/controller/transaction';

export const transactionRouter = express.Router();

transactionRouter.get('/:id', transactionController.get);
