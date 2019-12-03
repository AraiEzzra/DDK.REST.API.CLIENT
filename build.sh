REPOSITORY_NAME="ddkoin/rest-api-client"
TAG=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')

docker build -f build.Dockerfile -t $REPOSITORY_NAME:$TAG .
