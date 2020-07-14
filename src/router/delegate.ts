import express from 'express';

import { delegateController } from 'src/controller/delegate';

export const delegateRouter = express.Router();

delegateRouter.post('/getDelegates', delegateController.getDelegates);
delegateRouter.post('/getActiveDelegates', delegateController.getActiveDelegates);