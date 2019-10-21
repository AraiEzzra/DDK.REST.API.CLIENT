
import { SystemInfoSchema } from 'ddk.registry/dist/model/common/type';

export interface ISystemInfoRepository extends SystemInfoSchema {
    get(): SystemInfoSchema;
    update(info: SystemInfoSchema): void;
}

export class SystemInfoRepository implements ISystemInfoRepository {
    height: number;
    consensus: number;
    datetime: Date;
    peersCount: number;
    peers: Array<any>;
    broadhash: string;
    version: string;
    transactionsCount: {
        queue: number;
        conflictedQueue: number;
        pool: number;
    };

    constructor() {
        this.height = 0;
        this.consensus = 0;
        this.datetime = new Date();
        this.peersCount = 0;
        this.peers = [];
        this.broadhash = '';
        this.version = '';
        this.transactionsCount = {
            queue: 0,
            conflictedQueue: 0,
            pool: 0,
        };
    }

    get(): SystemInfoSchema {
        return {
            height: this.height,
            consensus: this.consensus,
            datetime: this.datetime,
            peersCount: this.peersCount,
            peers: this.peers,
            broadhash: this.broadhash,
            version: this.version,
            transactionsCount: this.transactionsCount,
        };
    }

    update(info: SystemInfoSchema): void {
        this.height = info.height;
        this.consensus = info.consensus;
        this.datetime = info.datetime;
        this.peersCount = info.peersCount;
        this.peers = info.peers;
        this.broadhash = info.broadhash;
        this.version = info.version;
        this.transactionsCount = info.transactionsCount;
    }
}
