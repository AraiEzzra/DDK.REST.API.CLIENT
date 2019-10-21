# System

## GET INFO

Request for getting system information.

Method URL: `/api/system/info`

HTTP method: `GET`

Response

| Parameter | Type                                    | Description                      |
|-----------|-----------------------------------------|----------------------------------|
| success   | boolean                                 | Operation status                 |
| data      | [System Info](../model.md#system-info) | System information               |

### GET SYSTEM INFO EXAMPLES

Request

GET `/api/system/info`

Successful response

```json
{
    "success": true,
    "data": {
        "height": 91217,
        "consensus": 100,
        "datetime": "2019-10-21T15:15:13.844Z",
        "peersCount": 0,
        "peers": [
            {
                "height": 91217,
                "broadhash": "8c543fa9a523dc69b829fceebc4a8d2584bdbaf53b9f36f5d73ccae609d390d6",
                "blocksIds": [
                    [
                        91217,
                        "8c543fa9a523dc69b829fceebc4a8d2584bdbaf53b9f36f5d73ccae609d390d6"
                    ],
                    [
                        91216,
                        "f18c8f680efcacb4a967cf12249f5648d3f22fd110a24452b0c149d792743513"
                    ],
                    [
                        91215,
                        "20b2fb1a1d85d407fc14aeaf1dd0f004ea0a29ed203593f3d773c5775aedd3d7"
                    ],
                    [
                        91214,
                        "d0fd0a971a944f18952115087d73edc3d57aab23de45713dd9a4171c13b88d9d"
                    ],
                    [
                        91213,
                        "c6400aa4f337bd1e61e45775ecb082b680c9f43b578272be275858b6c1fea0b7"
                    ],
                    [
                        91212,
                        "f84fc7b89b517156e6133ed3bec1a43522ad22dbccbc589c500174b3518bdc50"
                    ],
                    [
                        91211,
                        "577f0731b5b6ef44392197fe19879f655e5eda4d0746b22e5d8f948379f3722b"
                    ],
                    [
                        91210,
                        "675e903e0a672670dbc01ca7d21a2df48c091e8d1537e48b306230e86fa96032"
                    ],
                    [
                        91209,
                        "b6ce5c732e46e6b8d78fa55d40385a56736a34bd5be458d8a034ee6d2a191b24"
                    ],
                    [
                        91208,
                        "9aedc936d1e34abedf7753b19245859ba0145df7ac5c222142aba6284b81ed23"
                    ]
                ],
                "os": "linux4.4.0-165-generic",
                "version": "1.3.1",
                "minVersion": "1.2.13",
                "peerCount": 6,
                "ip": "167.71.211.28",
                "port": 7007,
                "peersCount": 6
            }
        ],
        "broadhash": "8c543fa9a523dc69b829fceebc4a8d2584bdbaf53b9f36f5d73ccae609d390d6",
        "version": "1.3.1",
        "transactionsCount": {
            "queue": 0,
            "conflictedQueue": 0,
            "pool": 0
        }
    }
}
```

## GET BLOCKCHAIN INFO

Request for getting blockchain information.

Method URL: `/api/system/blockchain-info`

HTTP method: `GET`

Response

| Parameter | Type                                            | Description                      |
|-----------|-------------------------------------------------|----------------------------------|
| success   | boolean                                         | Operation status                 |
| data      | [Blockchain Info](../model.md#blockchain-info) | Blockchain information           |

### GET BLOCKCHAIN INFO EXAMPLES

Request

GET `/api/system/blockchain-info`

Successful response

```json
{
    "success": true,
    "data": {
        "airdropBalance": 89547337500000,
        "totalSupply": 4500000000000000,
        "circulatingSupply": 928013305770000,
        "tokenHolders": 30,
        "totalStakeAmount": 4520900000000,
        "totalStakeHolders": 4,
        "transactionsCount": 965139
    }
}
```
