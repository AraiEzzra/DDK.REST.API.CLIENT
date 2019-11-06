# Migration

## To 1.0.3

1. Update repository

```bash
git pull
```

2. Open `docker/.env` file.
3. Remove variables `NODE_HOST`, `NODE_API_PORT`.
4. Add variable [NODE_HOSTS](setup/environment.md#ddk-node-hosts) to work with multiple nodes.

Example for production with 11 trusted nodes:

```
NODE_HOSTS=68.183.235.184:7008,68.183.176.187:7008,157.230.46.8:7008,159.65.131.165:7008,157.230.46.24:7008,157.230.38.119:7008,157.230.38.212:7008,157.230.33.130:7008,178.128.122.117:7008,178.128.123.4:7008,178.128.127.51:7008,128.199.198.201:7008,134.209.202.58:7008,203.130.48.126:7008,31.28.161.179:7008
```

5. Start client

```bash
sh start.sh
```
