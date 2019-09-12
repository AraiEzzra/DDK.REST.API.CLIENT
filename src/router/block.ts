import express from 'express';

import { blockController } from 'src/controller/block';

export const blockRouter = express.Router();

blockRouter.post('/getMany', blockController.getMany);
blockRouter.get('/last', blockController.getLast);
blockRouter.get('/:id', blockController.getById);
