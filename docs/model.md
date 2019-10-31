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
| votes            | Array<[Public Key](#public-key)> | Array of delegates public key             |
| type             | [Vote Type](#vote-types)                  | Vote type                                 |

## Key Pair

| Parameter  | Type   | Description |
|------------|--------|-------------|
| publicKey  | string | Public key  |
| privateKey | string | Private key |

## System Info

| Parameter         | Type                                      | Description           |
|-------------------|-------------------------------------------|-----------------------|
| height            | number                                    | Last block height     |
| consensus         | number                                    | Consensus (percent)   |
| datetime          | number                                    | Current date          |
| peersCount        | number                                    | Peers count           |
| peers             | Array<[Peer](#peer)>                      | Peers                 |
| broadhash         | string                                    | Last block id         |
| version           | string                                    | Node version          |
| transactionsCount | [Transactions Count](#transactions-count) | Transactions count    |

## Peer

| Parameter         | Type                              | Description                     |
|-------------------|-----------------------------------|---------------------------------|
| height            | number                            | Last block height               |
| broadhash         | string                            | Last block id                   |
| blocksIds         | Array<[Block Id](#peer-block-id)> | Last blocks info                |
| os                | string                            | Operating system                |
| version           | string                            | Node version                    |
| minVersion        | string                            | Min node version for connection |
| peerCount         | number                            | Count of peers                  |
| ip                | string                            | Host IP                         |
| port              | number                            | Port                            |
| peersCount        | number                            | Count of peers                  |

## Peer Block Id

| Parameter         | Type               | Description           |
|-------------------|--------------------|-----------------------|
| 0 (index)         | number             | height                |
| 1 (index)         | string             | id                    |

## Transactions Count

| Parameter         | Type   | Description             |
|-------------------|--------|-------------------------|
| queue             | number | In queue                |
| conflictedQueue   | number | In conflicted queue     |
| pool              | number | In pool                 |

## Blockchain Info

| Parameter         | Type   | Description             |
|-------------------|--------|-------------------------|
| airdropBalance    | number | Airdrop account balance |
| totalSupply       | number | Total supply            |
| circulatingSupply | number | Circulating supply      |
| tokenHolders      | number | Token holders count     |
| totalStakeAmount  | number | Total stake amount      |
| totalStakeHolders | number | Total stake holders     |
| transactionsCount | number | Transactions count      |

## Blocks filter

| Parameter        | Type   | Description           |
|------------------|--------|-----------------------|
| height           | number | Block height          |

Basic models are [here](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md)
