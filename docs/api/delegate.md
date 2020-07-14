## GET DELEGATES

Get Delegates

Method URL: `/api/delegate/getDelegates`

HTTP method: `POST`

Body parameters

| Parameter | Type                                               | Is Required | Description                |
|-----------|----------------------------------------------------|-------------|----------------------------|
| sort      | array<[Sort](../model.md#sort)>                    | -           | Sort                       |
| limit     | number                                             | +           | Limit                      |
| offset    | number                                             | +           | Offset                     |

Response

| Parameter   | Type                                        | Description                            |
|-------------|---------------------------------------------|----------------------------------------|
| success     | boolean                                     | Operation status                       |
| data.delegates | array<[Delegate](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#delegate> | Delegate |
| data.count  | number                                      | Total number of delegates |

Request body

```json
{
   "limit": 3,
   "offset": 0,
   "sort":[
      [
         "username",
         "ASC"
      ]
   ]
}
```

Response

```json
{
    "success": true,
    "data": {
    "success": true,
    "data": {
        "delegates": [
            {
                "username": "001_ddk_foundation",
                "missedBlocks": 0,
                "forgedBlocks": 0,
                "publicKey": "26d8f85ba602e2874ac47697e18d865151d8a090dfc2692dbef461c3bf2c8625",
                "votes": 10950,
                "confirmedVoteCount": 10950,
                "approval": 0
            },
            {
                "username": "DDK_Brunei",
                "missedBlocks": 1743,
                "forgedBlocks": 56646,
                "publicKey": "6690354691aa0374dca6ff7dd643d1e5a3e5f5fb97c1170413a7ba4c0efb1a4f",
                "votes": 232869,
                "confirmedVoteCount": 232869,
                "approval": 97.01
            },
            {
                "username": "DDK_Indonesia",
                "missedBlocks": 1531,
                "forgedBlocks": 56857,
                "publicKey": "d4999726b7db7e0e5c0d5f441e43d0e0b471aebb46178b9286f275f1f5911208",
                "votes": 200311,
                "confirmedVoteCount": 200311,
                "approval": 97.38
            }
        ],
        "count": 352
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




## GET ACTIVE DELEGATES

Get Active Delegates

Method URL: `/api/delegate/getActiveDelegates`

HTTP method: `POST`

Body parameters

| Parameter | Type                                               | Is Required | Description                |
|-----------|----------------------------------------------------|-------------|----------------------------|
| limit     | number                                             | +           | Limit                      |
| offset    | number                                             | +           | Offset                     |

Response

| Parameter   | Type                                        | Description                            |
|-------------|---------------------------------------------|----------------------------------------|
| success     | boolean                                     | Operation status                       |
| data.delegates | array<[Delegate](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/models.md#delegate> | Delegate |
| data.count  | number                                      | Total number of active delegates |

Request body

```json
{
   "limit": 3,
   "offset": 0
}
```

Response

```json
{
    "success": true,
    "data": {
    "success": true,
    "data": {
    "success": true,
    "data": {
        "delegates": [
            {
                "username": "TDALLIANCE1",
                "missedBlocks": 1998,
                "forgedBlocks": 56391,
                "publicKey": "276f0d09e64b68566fb458b7c71aeb62411d0b633ad6c038e5a4a042ec588af9",
                "votes": 258002,
                "confirmedVoteCount": 258002,
                "approval": 96.58
            },
            {
                "username": "TDALLIANCE2",
                "missedBlocks": 2645,
                "forgedBlocks": 55745,
                "publicKey": "3f0348b6d3ecaeaeca0a05ee4c2d7b4b7895ef0a12d8023ba245b6b8022833e5",
                "votes": 248641,
                "confirmedVoteCount": 248641,
                "approval": 95.47
            },
            {
                "username": "TDALLIANCE3",
                "missedBlocks": 2083,
                "forgedBlocks": 56307,
                "publicKey": "3f1ecf6de517a6bf2f5c7a8226a478dc571ed0100d53ee104842f4d443e49806",
                "votes": 245126,
                "confirmedVoteCount": 245126,
                "approval": 96.43
            }
        ],
        "count": 101
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









