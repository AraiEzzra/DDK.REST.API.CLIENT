# Block

| **Warning**: All requests for getting block(s) return no transactions. For getting transactions use [this](transaction.md#get-transactions) API with `block_id` filter |
| --- |

## GET BLOCK

Request for getting block by id (without transactions). Returns block or null if the block does not exist.

Method URL: `/api/block/:id`

HTTP method: `GET`

URL parameters

| Parameter | Type   | Is Required | Description |
|-----------|--------|-------------|-------------|
| id        | string | +           | Block id    |

Response

| Parameter | Type        | Description           |
|-----------|-------------|-----------------------|
| success   | boolean     | Operation status      |
| data      | [Block](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#block) | Requested block |

### GET TRANSACTION EXAMPLES

Request

GET `/api/blocks/6599e5ab893de7f12b9cca1ab448988ae3e22b10f09063cc0278d5cde88d0687`

Successful response

```json
{
    "success": true,
    "data": {
        "id": "6599e5ab893de7f12b9cca1ab448988ae3e22b10f09063cc0278d5cde88d0687",
        "version": 1,
        "height": 413966,
        "transactionCount": 0,
        "amount": 0,
        "fee": 0,
        "payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "generatorPublicKey": "137b9f0f839ab3ecd2146bfecd64d31e127d79431211e352bedfeba5fd61a57a",
        "signature": "3a06d7afd3eea6115c8aedab6cf25780d83783e5d742a0022744dbb6e6c6179b96e1e1b30f94efff3834781460152f772842614ef78427a497cd0163bdf98a00",
        "relay": 0,
        "transactions": [],
        "createdAt": 116623050,
        "previousBlockId": "5a23960142975d7f17050e7d420c745ac0c283cf5c325e370f3b99d40e2a91a0"
    }
}
```

Failed response

```json
{
   "success":false,
   "data":null
}
```

## GET BLOCKS

Search for specified blocks

Method URL: `/api/blocks/getMany`

HTTP method: `POST`

Body parameters

| Parameter | Type                                               | Is Required | Description                |
|-----------|----------------------------------------------------|-------------|----------------------------|
| sort      | array<[Sort](../model.md#sort)>                    | -           | Sort                       |
| filter    | [Blocks Filter](../model.md#get-blocks-filter)     | -           | Filter                     |
| limit     | number                                             | +           | Limit                      |
| offset    | number                                             | +           | Offset                     |

Response

| Parameter         | Type                                        | Description                            |
|-------------------|---------------------------------------------|----------------------------------------|
| success           | boolean                                     | Operation status                       |
| data.blocks | array<[Block](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#block)> | Blocks                           |
| data.count        | number                                      | Total number of blocks |

### GET TRANSACTIONS EXAMPLES

#### Example getting last block

```json
{
   "limit": 1,
   "offset": 0,
   "sort":[
      [
         "createdAt",
         "DESC"
      ]
   ]
}
```

Successful response

```json
{
    "success": true,
    "data": {
        "blocks": [
            {
                "id": "ea281e95d4914d7265dcbd8425d877febb3559f69963b1ad9f151ead660676a0",
                "version": 1,
                "height": 414059,
                "transactionCount": 0,
                "amount": 0,
                "fee": 0,
                "payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "generatorPublicKey": "83cb3d8641c8e73735cc1b70c915602ffcb6e5a68f14a71056511699050a1a05",
                "signature": "896a82e80cf29c1d8ee7f31314ee1018de72e725259d3041b5aac1b62dca8a33c46ee74b43f98468fcdb2074192eca605ba72cd07d504fb422bc8f25976e1e09",
                "relay": 0,
                "transactions": [],
                "createdAt": 116624450,
                "previousBlockId": "ab00a295757dc2867d4fb41a0bcf8d7a49161caa88cea2196fb7911ffd71b316"
            }
        ],
        "count": 414059
    }
}
```

#### Example getting block by height

Request body

```javascript
{
    "limit": 1,
    "offset": 0,
    "filter": {
    	"height": 10
    }
}
```

Response

```json
{
    "success": true,
    "data": {
        "blocks": [
            {
                "id": "9f79e3c42b617769cb1f3aff61fac7af23014489c83ad01f90c22a98393df3b7",
                "version": 1,
                "height": 10,
                "transactionCount": 0,
                "amount": 0,
                "fee": 0,
                "payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "generatorPublicKey": "301c99b6ee57807664eae0a43a58c7d39c5e8a6441aa2239e2024046161e652f",
                "signature": "cfd58ae8806a7d39e954d7716e8053c3a01db4949e2f9b5bfb66f862138976c52962ab59d7bd8310875c243b6de4418d01aeba78e05e366273fcddab83b4180e",
                "relay": 0,
                "transactions": [],
                "createdAt": 118870930,
                "previousBlockId": "30bec2549eafaf868192a6a7f0829b884cbf0f0b911dc237b62fda020c5897da"
            }
        ],
        "count": 1
    }
}
```

Failed response

```json
{
    "success": false,
    "errors": [
        "Invalid arguments",
        "Missing required property: offset",
        "Missing required property: limit"
    ]
}
```

## GET LAST BLOCK

Returns last appied block without transactions

Method URL: `/api/blocks/last`

HTTP method: `GET`

Parameters are missing

Response

| Parameter   | Type                            | Description                            |
|-------------|---------------------------------|----------------------------------------|
| success     | boolean                         | Operation status                       |
| data        | [Block](models.md#block)        | The last block                         |

Successful response

```json
{
    "success": true,
    "data": {
        "id": "be3c8ab5ed0afa0bd28d7eec84116d2f3b49d4a9fbed7a54311c504b4649ed87",
        "version": 1,
        "height": 414080,
        "transactionCount": 0,
        "amount": 0,
        "fee": 0,
        "payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "generatorPublicKey": "137b9f0f839ab3ecd2146bfecd64d31e127d79431211e352bedfeba5fd61a57a",
        "signature": "24c54a292ba3db80cf33d7d8f5faa767eca06c44127df63513ef690f790ff334523cfefad97c0179070aa404f7039af16a058f93a400bedcb562eadc0fd38e0c",
        "relay": 0,
        "transactions": [],
        "createdAt": 116624760,
        "previousBlockId": "1e2e6512fee8b82cf5cefd9cb7ad7f403bbc851ec2a84045bd294e20bd17e3e7"
    }
}
```
