import { Request, Response } from 'express';
import { nodePool } from 'src/service';
import { validate } from 'src/util/validate';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { HTTP_STATUS } from 'src/util/http';

export class DelegateController {
    constructor() {
        this.getDelegates = this.getDelegates.bind(this);
        this.getActiveDelegates = this.getActiveDelegates.bind(this);
    }

    @validate
    async getDelegates(req: Request, res: Response): Promise<Response> {
        const response = await nodePool.send(
            API_ACTION_TYPES.GET_DELEGATES,
            req.body,
        );

        if (!response.success) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(response);
        }

        if (!response.data) {
            return res.status(HTTP_STATUS.NOT_FOUND).send(response);
        }

        return res.send(response);
    }

    @validate
    async getActiveDelegates(req: Request, res: Response): Promise<Response> {
        const response = await nodePool.send(
            API_ACTION_TYPES.GET_ACTIVE_DELEGATES,
            req.body,
        );

        if (!response.success) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(response);
        }

        if (!response.data) {
            return res.status(HTTP_STATUS.NOT_FOUND).send(response);
        }

        return res.send(response);
    }
}

export const delegateController = new DelegateController();
