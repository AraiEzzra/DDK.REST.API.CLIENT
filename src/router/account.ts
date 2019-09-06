import express from 'express';

import { accountController } from 'src/controller/account';

export const accountRouter = express.Router();

accountRouter.get('/:address', accountController.get);
accountRouter.get('/:address/balance', accountController.getBalance);
