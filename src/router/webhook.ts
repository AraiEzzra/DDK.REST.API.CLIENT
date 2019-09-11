import express from 'express';

import { webhookController } from 'src/controller/webhook';

export const webhookRouter = express.Router();

webhookRouter.post('/subscribe/confirm-transaction', webhookController.onConfirmTransaction);
