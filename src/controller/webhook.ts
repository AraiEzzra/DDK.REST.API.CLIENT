import { Request, Response } from 'express';

import { transactionConfirmationService } from 'src/service';
import { validate } from 'src/util/validate';
import { transactionRepository } from 'src/repository';
import { HTTP_STATUS } from 'src/util/http';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';

export class WebhookController {
    @validate
    onConfirmTransaction(req: Request, res: Response): Response {
        if (!transactionRepository.has(req.body.transactionId)) {
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .send(new ResponseEntity({ errors: ['The transaction is missing in repository'] }));
        }

        transactionConfirmationService.subscribe(req.body);

        return res.send({ success: true });
    }
}

export const webhookController = new WebhookController();
