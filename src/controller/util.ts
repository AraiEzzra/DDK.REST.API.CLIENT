import { Request, Response } from 'express';
import { generatePassphrase } from 'ddk.registry/dist/util/passphrase';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import { createKeyPairBySecret } from 'ddk.registry/dist/util/crypto';

import { validate } from 'src/util/validate';

export class UtilController {
    generatePassphrase(_req: Request, res: Response): Response {
        const passphrase = generatePassphrase();
        const response = new ResponseEntity({ data: passphrase });

        return res.send(response);
    }

    @validate
    makeKeyPair(req: Request, res: Response): Response {
        const { secret } = req.body;
        const keyPair = createKeyPairBySecret(secret);

        return res.send({
            success: true,
            data: {
                publicKey: keyPair.publicKey.toString('hex'),
                privateKey: keyPair.privateKey.toString('hex'),
            },
        });
    }
}

export const utilController = new UtilController();
