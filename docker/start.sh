# Create docker-compose.yml

SAMPLE_FILE_NAME=docker-compose.yml.sample
COMPOSE_FILE_NAME=docker-compose.yml
VERSION=$(cat ../package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')

echo "Updating docker-compose.yml to version $VERSION"

cp $SAMPLE_FILE_NAME $COMPOSE_FILE_NAME

sed -i "s/\$version/$VERSION/g" $COMPOSE_FILE_NAME

# Start container

docker-compose up -d
