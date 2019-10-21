import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { SystemInfoSchema } from 'ddk.registry/dist/model/common/type';

import { SocketClient } from 'src/shared/socket';
import { ISystemInfoRepository } from 'src/repository/systemInfo';

export class SystemInfoService {
    private repository: ISystemInfoRepository;

    constructor(
        systemInfoRepository: ISystemInfoRepository,
        socketClient: SocketClient<any, EVENT_TYPES | API_ACTION_TYPES>,
    ) {
        this.repository = systemInfoRepository;

        // TODO: fetch system info when API will be added to core

        socketClient.addCodeListener(EVENT_TYPES.UPDATE_SYSTEM_INFO, this.onUpdate);
    }

    private onUpdate = (info: SystemInfoSchema): void => {
        this.repository.update(info);
    }
}
