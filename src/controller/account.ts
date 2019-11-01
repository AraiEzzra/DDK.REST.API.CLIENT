import { Request, Response } from 'express';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';

import { validate } from 'src/util/validate';
import { socketClient } from 'src/service/socket';
import { createKeyPairBySecret } from 'ddk.registry/dist/util/crypto';
import { getAddressByPublicKey } from 'ddk.registry/dist/util/account';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';

export class AccountController {
    @validate
    async create(req: Request, res: Response): Promise<Response> {
        const { secret } = req.body;

        const keyPair = createKeyPairBySecret(secret);
        const publicKey = keyPair.publicKey.toString('hex');
        const address = getAddressByPublicKey(publicKey);

        return res.send(new ResponseEntity({
            data: {
                publicKey,
                address,
            },
        }));
    }

    @validate
    async get(req: Request, res: Response): Promise<Response> {
        const response = await socketClient.send(
            API_ACTION_TYPES.GET_ACCOUNT,
            req.params,
        );

        return res.send(response);
    }

    @validate
    async getBalance(req: Request, res: Response): Promise<Response> {
        const response = await socketClient.send(
            API_ACTION_TYPES.GET_ACCOUNT_BALANCE,
            req.params,
        );

        return res.send(response);
    }
}

export const accountController = new AccountController();
