import { Request, Response } from 'express';
import { generatePassphrase } from 'ddk.registry/dist/util/passphrase';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';

export class UtilController {
    generatePassphrase(_req: Request, res: Response): Response {
        const passphrase = generatePassphrase();
        const response = new ResponseEntity({ data: passphrase });

        return res.send(response);
    }
}

export const utilController = new UtilController();
