SAMPLE_FILE_NAME=docker-compose.yml.sample
COMPOSE_FILE_NAME=docker-compose.yml
VERSION=$(cat ../package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')

cp $SAMPLE_FILE_NAME $COMPOSE_FILE_NAME

sed -i "s/\$version/$VERSION/g" $COMPOSE_FILE_NAME

echo "Updated to version $VERSION"
