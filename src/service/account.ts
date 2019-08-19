import { createKeyPairBySecret } from 'ddk.registry/dist/util/crypto';
import { getAddressByPublicKey } from 'ddk.registry/dist/util/account';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { Account } from 'ddk.registry/dist/model/common/account';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import { SerializedAccount, Address, PublicKey } from 'ddk.registry/dist/model/common/type';

import { socketClient } from 'src/socket';

export class AccountService {
    async fetchByAddress(address: Address): Promise<ResponseEntity<Account>> {
        const accountResponse = await socketClient.send<{ address: BigInt }, SerializedAccount>(
            API_ACTION_TYPES.GET_ACCOUNT,
            { address },
        );
        if (!accountResponse) {
            return new ResponseEntity({ errors: accountResponse.errors });
        }

        const sender = new Account({
            address: BigInt(accountResponse.data.address),
            publicKey: accountResponse.data.publicKey,
            secondPublicKey: accountResponse.data.secondPublicKey,
            referrals: accountResponse.data.referrals.map(referral => new Account({
                publicKey: '',
                address: BigInt(referral),
            })),
            stakes: accountResponse.data.stakes,
            actualBalance: accountResponse.data.actualBalance,
        });

        return new ResponseEntity({ data: sender });
    }

    async fetchByPublicKey(publicKey: PublicKey): Promise<ResponseEntity<Account>> {
        const address = getAddressByPublicKey(publicKey);

        return this.fetchByAddress(address);
    }

    async fetchBySecret(secret: string): Promise<ResponseEntity<Account>> {
        const publicKey = createKeyPairBySecret(secret).publicKey.toString('hex');

        return this.fetchByPublicKey(publicKey);
    }
}
