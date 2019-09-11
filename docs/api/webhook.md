# Webhook

## Subscribe

### Subscribe on transaction confirm

Request for subscribing to action: `transaction confirm`. This action executes when the transaction will have 6 or more confirmations. After execution, you will unsubscribe automatically

Method URL: `/api/webhook/subscribe/confirm-transaction`

HTTP method: `POST`

Body parameters

| Parameter     | Is Required | Description                 |
|---------------|-------------|-----------------------------|
| url           | +           | Webhook url                 |
| transactionId | +           | Transaction id to subscribe |

Response

| Parameter | Type                                                                                   | Description       |
|-----------|----------------------------------------------------------------------------------------|-------------------|
| success   | boolean                                                                                | Operation status  |
| data      | [Transaction](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#transaction) | The transaction you are subscribed to |

#### Subscribe on transaction confirm examples

Request body

```json
{
   "url": "https://webhook.site/33a9c7c0-bec1-45f7-b5c8-c9432bf842d2",
   "transactionId": "568c252bf8ecd33af580caa23027cc349ff652dd7ca21a8cf5fd153e55173322"
}
```

Successful response

```json
{
   "success": true,
}
```

Failed response

```json
{
    "success": false,
    "errors": [
        "The transaction is missing in repository"
    ]
}
```
