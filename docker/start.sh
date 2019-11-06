if [ ! -f "./docker-compose.yml" ]; then
    sh update.sh
fi

docker-compose up -d
