import express from 'express';

import { utilController } from 'src/controller/util';

export const utilRouter = express.Router();

utilRouter.get('/generate-passphrase', utilController.generatePassphrase);
utilRouter.post('/make-key-pair', utilController.makeKeyPair);
