import { Request, Response } from 'express';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';

import { systemRepository } from 'src/repository';

export class SystemController {
    getInfo(_req: Request, res: Response): Response {
        const data = systemRepository.getInfo();

        return res.send(new ResponseEntity({ data }));
    }
}

export const systemController = new SystemController();
