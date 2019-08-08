import { createKeyPairBySecret } from 'ddk.registry/dist/util/crypto';
import { getAddressByPublicKey } from 'ddk.registry/dist/util/account';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { Account } from 'ddk.registry/dist/model/common/account';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import { SerializedAccount } from 'ddk.registry/dist/model/common/type';

import { socketClient } from 'src/socket';

export const fetchAccountBySecret = async (secret: string): Promise<ResponseEntity<Account>> => {
    const senderPublicKey = createKeyPairBySecret(secret).publicKey.toString('hex');
    const senderAddress = getAddressByPublicKey(senderPublicKey);

    const accountResponse = await socketClient.send<{ address: BigInt }, SerializedAccount>(
        API_ACTION_TYPES.GET_ACCOUNT,
        { address: senderAddress },
    );
    if (!accountResponse) {
        return new ResponseEntity({ errors: accountResponse.errors });
    }

    const sender = new Account({
        address: BigInt(accountResponse.data.address),
        publicKey: accountResponse.data.publicKey,
        secondPublicKey: accountResponse.data.secondPublicKey,
        referrals: accountResponse.data.referrals.map(address => new Account({
            publicKey: '',
            address: BigInt(address),
        })),
        stakes: accountResponse.data.stakes,
        actualBalance: accountResponse.data.actualBalance,
    });

    return new ResponseEntity({ data: sender });
};
