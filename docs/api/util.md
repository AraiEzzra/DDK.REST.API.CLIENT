# Utils

## Generate Passphrase

Request for generation passphrase (secret)

Method URL: `/api/utils/generate-passphrase`

HTTP method: `GET`

Response

| Parameter | Type    | Description        |
|-----------|---------|--------------------|
| success   | boolean | Operation status   |
| data      | string  | Account passphrase |

### Generate Passphrase examples

Successful response

```json
{
    "success": true,
    "data": "blush suffer gun crane frame object menu bunker pony good dumb cigar"
}
```

## Make key pair

Request for getting key pair from a passphrase (secret)

Method URL: `/api/utils/make-key-pair`

HTTP method: `POST`

Body parameters

| Parameter | Type    | Is Required | Description |
|-----------|---------|-------------|-------------|
| secret    | string  | +           | Passphrase  |

Response

| Parameter | Type                            | Description        |
|-----------|---------------------------------|--------------------|
| success   | boolean                         | Operation status   |
| data      | [KeyPair](../model.md#key-pair) | Account passphrase |

### Make key pair examples

Body parameters

```json
{
	"secret": "hen worry two thank unfair salmon smile oven gospel grab latin reason"
}
```

Successful response

```json
{
    "success": true,
    "data": {
        "publicKey": "f4ae589b02f97e9ab5bce61cf187bcc96cfb3fdf9a11333703a682b7d47c8dc2",
        "privateKey": "dcef19b89a1d8ab1d46f5a69709fc70b37e922ee3ee12a19feaa3dc385551328f4ae589b02f97e9ab5bce61cf187bcc96cfb3fdf9a11333703a682b7d47c8dc2"
    }
}
```

Failed response

```json
{
    "success": false,
    "errors": [
        "Secret parameter is missing in the query string"
    ]
}
```
