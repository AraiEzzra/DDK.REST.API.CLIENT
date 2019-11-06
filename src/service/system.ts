import { SystemInfoSchema } from 'ddk.registry/dist/model/common/type';

import { ISystemRepository } from 'src/repository/system';

export class SystemService {
    private repository: ISystemRepository;

    constructor(
        systemRepository: ISystemRepository,
    ) {
        this.repository = systemRepository;

        // TODO: fetch system info when API will be added to core
    }

    onUpdateInfo = (info: SystemInfoSchema): void => {
        this.repository.updateInfo(info);
    }
}
