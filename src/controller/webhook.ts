import { Request, Response } from 'express';

import { transactionConfirmationService } from 'src/service';
import { validate } from 'src/util/validate';

export class WebhookController {
    @validate
    async onConfirmTransaction(req: Request, res: Response): Promise<Response> {
        transactionConfirmationService.subscribe(req.body);

        return res.send({ success: true });
    }
}

export const webhookController = new WebhookController();
