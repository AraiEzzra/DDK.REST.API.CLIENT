# Accounts

## Get Account

Request for getting an account. Returns account or null if the account does not exist.

Method URL: `/api/accounts/:address`

HTTP method: `GET`

URL parameters

| Parameter | Is Required | Description     |
|-----------|-------------|-----------------|
| address   | +           | Account address |

Response

| Parameter | Type                                                                                   | Description       |
|-----------|----------------------------------------------------------------------------------------|-------------------|
| success   | boolean                                                                                | Operation status  |
| data      | [Account](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#account) | Requested account |

### GET ACCOUNT EXAMPLES

Successful response

```json
{
   "success":true,
   "data":{
      "address":"4995063339468361088",
      "isDelegate":false,
      "publicKey":"f4ae589b02f97e9ab5bce61cf187bcc96cfb3fdf9a11333703a682b7d47c8dc2",
      "actualBalance":4202990199580000,
      "referrals":[],
      "votes":[],
      "stakes":[]
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

```json
{
    "success": false,
    "errors": [
        "Socket timeout"
    ]
}
```

## Get Account Balance

Request for getting an account balance. Returns account balance or null if the account does not exist.

Method URL: `/api/accounts/:address/balance`

HTTP method: `GET`

URL parameters

| Parameter | Is Required | Description     |
|-----------|-------------|-----------------|
| address   | +           | Account address |

Response

| Parameter | Type    | Description               |
|-----------|---------|---------------------------|
| success   | boolean | Operation status          |
| data      | number  | Requested account balance |

### GET ACCOUNT BALANCE EXAMPLES

Successful response

```json
{
   "success":true,
   "data": 4202989898990000
}
```

Failed response

```json
{
   "success":false,
   "data":null
}
```

```json
{
    "success": false,
    "errors": [
        "Socket timeout"
    ]
}
```
