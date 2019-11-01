REPOSITORY_NAME="ddkoin/rest-api-client"
TAG="stable"

docker build -f build.Dockerfile -t $REPOSITORY_NAME:$TAG .
