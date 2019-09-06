# Utils

## Generate Passphrase

Request for generation passphrase

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
