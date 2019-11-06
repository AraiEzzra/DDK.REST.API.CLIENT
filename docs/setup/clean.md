# Cleaning

## Docker images

To remove unused `ddkoin/rest-api-client` images enter the following command in the docker folder:

```bash
sh remove_images.sh
```

It removes all non-conflict `ddkoin/rest-api-client` images.

If you need to remove all `ddkoin/rest-api-client` images, enter:

```bash
sh remove_images.sh --force
```
