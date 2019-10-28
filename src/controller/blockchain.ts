import { Request, Response } from 'express';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';

import { blockchainRepository } from 'src/repository';

export class BlockchainController {
    getInfo(_req: Request, res: Response): Response {
        const data = blockchainRepository.getInfo();

        return res.send(new ResponseEntity({ data }));
    }
}

export const blockchainController = new BlockchainController();
