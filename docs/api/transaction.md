# TRANSACTIONS

## CREATE TRANSACTION

Creates transaction on the node and returns it.

Method URL: `/api/transactions`

HTTP method: `POST`

Body parameters

| Parameter    | Type                                           | Is Required | Description           |
|--------------|------------------------------------------------|-------------|-----------------------|
| secret       | string                                         | +           | Account secret        |
| secondSecret | string                                         | -           | Account second secret |
| transaction  | [Transaction Data](../model.md#transaction-data) | +           | Transaction data      |

Response

| Parameter | Type        | Description         |
|-----------|-------------|---------------------|
| success   | boolean     | Operation status    |
| data      | [Transaction](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#transaction) | Created transaction |

### Examples

Request body

```json
{
   "secret":"empty hand absent pepper reward music top foil violin disease target exhibit",
   "transaction":{
      "type":10,
      "asset":{
         "amount":100000000,
         "recipientAddress":"13917551777668161189"
      }
   }
}
```

Successful response

```json
{
   "success": true,
   "data": {
      "id":"568c252bf8ecd33af580caa23027cc349ff652dd7ca21a8cf5fd153e55173322",
      "type":10,
      "createdAt":102188552,
      "senderPublicKey":"f4ae589b02f97e9ab5bce61cf187bcc96cfb3fdf9a11333703a682b7d47c8dc2",
      "senderAddress":"4995063339468361088",
      "signature":"3147dcad5a0cdfd8ddbb027b42cad685eae18972015c1e13b5489f850700d1b32758680e5521b123afc664d9065bb3a9bc45d578b09ba44a28bf40af63947305",
      "salt":"403e84f2b2bd070f80a1185a298c9a33",
      "relay":0,
      "asset":{
         "recipientAddress":"13917551777668161189",
         "amount":100000000
      }
   }
}
```

Failed response

```json
{
   "success":false,
   "errors":[
      "IS NOT VALID REQUEST:'CREATE_TRANSACTION'... Reference could not be resolved: CREATE_TRANSACTION"
   ]
}
```

## GET TRANSACTION

Request for getting transaction by id. Returns transaction or null if the transaction does not exist.

Method URL: `/api/transactions/:id`

HTTP method: `GET`

URL parameters

| Parameter | Type   | Is Required | Description    |
|-----------|--------|-------------|----------------|
| id        | string | +           | Transaction id |

Response

| Parameter | Type        | Description           |
|-----------|-------------|-----------------------|
| success   | boolean     | Operation status      |
| data      | [Transaction](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#transaction) | Requested transaction |

### GET TRANSACTION EXAMPLES

Request

GET `/api/transactions/c7d80bf1bb220e62735bd388549a87c0cd93b8be30a1ae2f7291ce20d2a94b79`

Successful response

```json
{
   "success":true,
   "data":{
      "id":"c7d80bf1bb220e62735bd388549a87c0cd93b8be30a1ae2f7291ce20d2a94b79",
      "blockId":"cbb9449abb9672d33fa2eb200b1c8b03db7c6572dfb6e59dc334c0ab82b63ab0",
      "type":10,
      "createdAt":0,
      "senderPublicKey":"49a2b5e68f851a11058748269a276b0c0d36497215548fb40d4fe4e929d0283a",
      "senderAddress":"12384687466662805891",
      "signature":"226ed984bf3d82b7c332ce48bc976fcc35930d22cb068b2e9de993a4fb3e402d4bdb7077d0923b8dd2c205e6a2473884752615c0787967b218143eec5df1390c",
      "secondSignature":null,
      "salt":"a7fdae234eeb416e31f5f02571f54a0c",
      "asset":{
         "recipientAddress":"4995063339468361088",
         "amount":4500000000000000
      }
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

## GET TRANSACTIONS

Search for specified transactions

Method URL: `/api/transactions/getMany`

HTTP method: `POST`

Body parameters

| Parameter | Type                                            | Is Required | Description                |
|-----------|-------------------------------------------------|-------------|----------------------------|
| filter    | [Transactions Filter](../model.md#transactions-filter) | -           | Filter |
| sort      | array<[Sort](../model.md#sort)>                   | -           | Sort                       |
| limit     | number                                          | +           | Limit                      |
| offset    | number                                          | +           | Offset                     |

Response

| Parameter         | Type                                        | Description                            |
|-------------------|---------------------------------------------|----------------------------------------|
| success           | boolean                                     | Operation status                       |
| data.transactions | array<[Transaction](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#transaction)> | Transactions                           |
| data.count        | number                                      | Total number of entries for the filter |

### GET TRANSACTIONS EXAMPLES

Request body

```json
{
   "filter":{
      "sender_public_key":"f4ae589b02f97e9ab5bce61cf187bcc96cfb3fdf9a11333703a682b7d47c8dc2",
      "block_id":"2313006c8b7f5a628ef5a085d7b8ddb37244dcbe24452da12801bf69870e4e0d",
      "type":10
   },
   "sort":[
      [
         "createdAt",
         "DESC"
      ]
   ],
   "limit":1,
   "offset":0
}
```

Successful response

```json
{
   "success":true,
   "data":{
      "transactions":[
         {
            "id":"568c252bf8ecd33af580caa23027cc349ff652dd7ca21a8cf5fd153e55173322",
            "blockId":"2313006c8b7f5a628ef5a085d7b8ddb37244dcbe24452da12801bf69870e4e0d",
            "type":10,
            "createdAt":102188552,
            "senderPublicKey":"f4ae589b02f97e9ab5bce61cf187bcc96cfb3fdf9a11333703a682b7d47c8dc2",
            "senderAddress":"4995063339468361088",
            "signature":"3147dcad5a0cdfd8ddbb027b42cad685eae18972015c1e13b5489f850700d1b32758680e5521b123afc664d9065bb3a9bc45d578b09ba44a28bf40af63947305",
            "secondSignature":null,
            "salt":"403e84f2b2bd070f80a1185a298c9a33",
            "asset":{
               "recipientAddress":"13917551777668161189",
               "amount":100000000
            }
         }
      ],
      "count":5
   }
}
```

Failed response

```json
{
   "success":false,
   "errors":[
      "IS NOT VALID REQUEST:'GET_TRANSACTIONS'... Reference could not be resolved: GET_TRANSACTIONS"
   ]
}
```
