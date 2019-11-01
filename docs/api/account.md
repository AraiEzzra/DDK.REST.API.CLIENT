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

## Create account

Uses for generating public key and DDK address from secret

Method URL: `/api/accounts`

HTTP method: `POST`

Body parameters

| Parameter | Is Required | Description             |
|-----------|-------------|-------------------------|
| secret    | +           | Account passphrase      |

Response

| Parameter | Type                                   | Description               |
|-----------|----------------------------------------|---------------------------|
| success   | boolean                                | Operation status          |
| data      | [Create Account Data](../model.md#create-account-data) | Account data |

### Create Account Example

Request body

```json
{
	"secret": "bless gloom bargain square bench patient since illness tobacco garden cargo naive"
}
```

Response

```json
{
    "success": true,
    "data": {
        "publicKey": "1f89194cfe77e2d146053daec998f2feaa165fcb6d334fcea219a82822fdbcbf",
        "address": "1134283086390612901"
    }
}
```

Failed Response

```json
{
    "success": false,
    "errors": [
        "Invalid arguments",
        "Object didn't pass validation for format secret: invalid secret"
    ]
}
```
