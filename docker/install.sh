IS_NETWORK_PRESENT="$(docker network ls | grep docker_ddk-testnet -c)"

if [ "$IS_NETWORK_PRESENT" -eq "1" ]; then
    echo "You already have the DDK network in the Docker"
else
    docker network create --subnet=10.0.0.0/9 --gateway=10.0.0.1 docker_ddk-testnet
fi

sh update.sh
