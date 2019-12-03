VERSION=$(cat ../package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')

docker run ddkoin/rest-api-client:$VERSION npm run test
