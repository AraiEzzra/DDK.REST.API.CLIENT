
import { SystemInfoSchema } from 'ddk.registry/dist/model/common/type';

export interface ISystemRepository {
    getInfo(): SystemInfoSchema;
    updateInfo(info: SystemInfoSchema): void;
}

export class SystemRepository implements ISystemRepository {
    info: SystemInfoSchema;

    constructor() {
        this.info = {
            height: 0,
            consensus: 0,
            datetime: new Date(),
            peersCount: 0,
            peers: [],
            broadhash: '',
            version: '',
            transactionsCount: {
                queue: 0,
                conflictedQueue: 0,
                pool: 0,
            },
        };
    }

    getInfo(): SystemInfoSchema {
        return this.info;
    }

    updateInfo(info: SystemInfoSchema): void {
        this.info = info;
    }
}
