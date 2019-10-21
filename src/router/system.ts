import express from 'express';

import { systemController } from 'src/controller/system';

export const systemRouter = express.Router();

systemRouter.get('/blockchain-info', systemController.getBlockchainInfo);
