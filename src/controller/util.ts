import { Request, Response } from 'express';
import { generatePassphrase } from 'ddk.registry/dist/util/passphrase';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import { createKeyPairBySecret } from 'ddk.registry/dist/util/crypto';

export class UtilController {
    generatePassphrase(_req: Request, res: Response): Response {
        const passphrase = generatePassphrase();
        const response = new ResponseEntity({ data: passphrase });

        return res.send(response);
    }

    makeKeyPair(req: Request, res: Response): Response {
        const { secret } = req.body;
        if (!secret) {
            return res.send({
                success: false,
                errors: ['Secret parameter is missing in the query string'],
            });
        }

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
