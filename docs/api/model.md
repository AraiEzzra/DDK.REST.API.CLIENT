# Models

## Transaction Types

| Name      | Value |
|-----------|-------|
| REGISTER  | 0     |
| SEND      | 10    |
| SIGNATURE | 20    |
| DELEGATE  | 30    |
| STAKE     | 40    |
| SENDSTAKE | 50    |
| VOTE      | 60    |

## Vote Types

| Name      | Value |
|-----------|-------|
| VOTE      | +     |
| DOWN_VOTE | -     |

## Public key

Type `string`

## Transaction

| Parameter       | Type                                   | Description                       |
|-----------------|----------------------------------------|-----------------------------------|
| id              | string                                 | Address                           |
| blockId         | string                                 | Block id                          |
| type            | [Transaction Type](#transaction-types) | Type                              |
| createdAt       | number                                 | Creation time in epochtime format |
| senderPublicKey | string                                 | Sender public key                 |
| senderAddress   | string                                 | Sender address                    |
| signature       | string                                 | Signature                         |
| secondSignature | string                                 | Second signature                  |
| salt            | string                                 | Salt                              |
| relay           | number                                 | Transfer count                    |
| asset           | [Asset](#asset)                        | Asset by type                     |

## Transaction Data

| Parameter | Type                                   | Description                          |
|-----------|----------------------------------------|--------------------------------------|
| type      | [Transaction Type](#transaction-types) | Transaction type                     |
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
