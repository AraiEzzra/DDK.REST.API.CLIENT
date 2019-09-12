# Models

Basic models are [here](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md)

## Transactions Filter

| Parameter        | Type   | Description           |
|------------------|--------|-----------------------|
| type         | [Transaction Type](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#transaction-types) | Transaction type |
| blockId     | string | Block Id |
| senderPublicKey     | string | Sender public key |

## Vote Types

| Name      | Value |
|-----------|-------|
| VOTE      | +     |
| DOWN_VOTE | -     |

## Public key

Type `string`

## Transaction Data

| Parameter | Type                                   | Description                          |
|-----------|----------------------------------------|--------------------------------------|
| type      | [Transaction Type](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#transaction-types) | Transaction type                     |
| asset     | Asset Data                             | Asset data based on transaction type |

## Asset Referral Data

| Parameter        | Type   | Description           |
|------------------|--------|-----------------------|
| referral         | string | Referral DDK address  |

## Asset Send Data

| Parameter        | Type   | Description           |
|------------------|--------|-----------------------|
| amount           | number | Amount for send       |
| recipientAddress | string | Recipient DDK address |

## Asset Signature Data

| Parameter        | Type   | Description           |
|------------------|--------|-----------------------|
| publicKey        | string | Second public key     |

## Asset Delegate Data

| Parameter        | Type   | Description           |
|------------------|--------|-----------------------|
| username         | string | Delegate username     |

## Asset Stake Data

| Parameter        | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| createdAt        | number | Transaction creation time in epoch format |
| amount           | number | Amount for stake                          |

## Asset Vote Data

| Parameter        | Type                                      | Description                               |
|------------------|-------------------------------------------|-------------------------------------------|
| createdAt        | number                                    | Transaction creation time in epoch format |
| votes            | Array<[Public Key](models.md#public-key)> | Array of delegates public key             |
| type             | [Vote Type](#vote-types)                  | Vote type                                 |

Basic models are [here](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md)
