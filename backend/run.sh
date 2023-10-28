#!/usr/bin/env sh

mkdir -p ~/.aws
echo '[default]' > ~/.aws/config
echo 'region = us-east-1' >> ~/.aws/config
echo '[default]' > ~/.aws/credentials
echo 'aws_access_key_id = foo' >> ~/.aws/credentials
echo 'aws_secret_access_key = bar' >> ~/.aws/credentials

npm run build:watch &
npx sls offline start --stage=localhost
