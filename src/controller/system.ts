import { Request, Response } from 'express';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';

import { blockchainInfoRepository, systemInfoRepository } from 'src/repository';

export class SystemController {
    getInfo(_req: Request, res: Response): Response {
        const data = systemInfoRepository.get();

        return res.send(new ResponseEntity({ data }));
    }

    getBlockchainInfo(_req: Request, res: Response): Response {
        const data = blockchainInfoRepository.get();

        return res.send(new ResponseEntity({ data }));
    }
}

export const systemController = new SystemController();
