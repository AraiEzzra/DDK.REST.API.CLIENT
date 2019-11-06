docker rmi $1 $(docker images --format '{{.Repository}}:{{.Tag}}' | grep 'ddkoin/rest-api-client')
