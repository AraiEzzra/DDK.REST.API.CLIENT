import { EVENT_TYPES } from 'ddk.registry/dist/model/transport/event';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { SystemInfoSchema } from 'ddk.registry/dist/model/common/type';

import { SocketClient } from 'src/shared/socket';
import { ISystemRepository } from 'src/repository/system';

export class SystemService {
    private repository: ISystemRepository;

    constructor(
        systemRepository: ISystemRepository,
        socketClient: SocketClient<any, EVENT_TYPES | API_ACTION_TYPES>,
    ) {
        this.repository = systemRepository;

        // TODO: fetch system info when API will be added to core

        socketClient.addCodeListener(EVENT_TYPES.UPDATE_SYSTEM_INFO, this.onUpdateInfo);
    }

    private onUpdateInfo = (info: SystemInfoSchema): void => {
        this.repository.updateInfo(info);
    }
}
