import express from 'express';

import { blockchainController } from 'src/controller/blockchain';

export const blockchainRouter = express.Router();

blockchainRouter.get('/info', blockchainController.getInfo);
