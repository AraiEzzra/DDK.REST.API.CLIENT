# EPOCH TIME

DDK epoch time is time starting on January 1, 2016

To convert epoch time to Unix timestamp need add `1451667600` to the epoch time

## Example

For example, we have a transaction

```json
{
    "id": "f833a3313ee4e7b18ab92189476ca73b71990c440666b4b1889a914d5df9e25b",
    "blockId": "95e1cadceb5c91d27e40ea5971a163901441ed34a66914fbb02370d7a1e2534e",
    "type": 60,
    "createdAt": 121392370,
    "senderPublicKey": "f4ae589b02f97e9ab5bce61cf187bcc96cfb3fdf9a11333703a682b7d47c8dc2",
    "senderAddress": "4995063339468361088",
    "signature": "5960275983c813abb21dddbe09841b9a69b652ab6083edc9ab97593964e75d3f9ca98c44ca2c5d363b6d7f1065e1c4ed6a794351ca5573454afe809a8b2a2b01",
    "secondSignature": null,
    "fee": 380000,
    "salt": "31c64e0d6a3bdaf765c22fc8943a2010",
    "relay": 0,
    "confirmations": 6016,
    "asset": {
        "votes": [
            "+6fafb15bf9e9bff361f144ff2dc22743151e0fc404e7a257017220dcb09c31a3",
            "+eb3ecfad0b81f6744a0c9152e3b2baabdb6a4c795cfc2fbf94caf9276bbf1cb7",
            "+3c45f3082394abc2fa5d0b07bb0da9db3ec9349023d8c04824b0752756e4ff6e"
        ],
        "reward": 0,
        "unstake": 0,
        "airdropReward": {
            "sponsors": []
        }
    }
}
```

The `createdAt` field is in epoch time format

Add `1451667600` to `121392370` and we'll get `1573059970`.

`1573059970` is Unix timestamp (measured in seconds) and equals to `2019-11-06T17:06:10.000Z` ISO 8601 format

To convert to milliseconds, multiply `1573059970` by `1000` and we'll get `1573059970000`
