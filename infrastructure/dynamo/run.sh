#!/usr/bin/env sh

set -m

mkdir -p ~/.aws
echo '[default]' > ~/.aws/config
echo 'region = us-east-1' >> ~/.aws/config
echo '[default]' > ~/.aws/credentials
echo 'aws_access_key_id = foo' >> ~/.aws/credentials
echo 'aws_secret_access_key = bar' >> ~/.aws/credentials

java -jar DynamoDBLocal.jar -dbPath /data -sharedDb &

while ! aws dynamodb list-tables --endpoint-url http://localhost:8000 > /dev/null; do
  echo "waiting"
  sleep 1
done

# shellcheck disable=SC2045
for json in $(ls /tables/*.json); do
  (aws dynamodb create-table --cli-input-json "file://${json}" --endpoint-url 'http://localhost:8000' --region us-east-1 >/dev/null 2>/dev/null) || true
done

fg 1
