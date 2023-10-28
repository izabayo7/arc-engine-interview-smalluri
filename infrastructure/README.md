# Infrastructure

The infrastructure is a set of Docker containers that are used to run the
project. These containers are defined in the `docker-compose.yml` file, and
are used to run the project in development mode. These include:

- `dynamo`: A DynamoDB container that emulates the AWS environment, running
    on `localhost:8000`.
- `dynamo-admin`: A container that runs the [DynamoDB
    Admin](https://github.com/aaronshaf/dynamodb-admin#readme) web interface,
    running on `localhost:8001`. This is a convenience container that allows
    you to view the contents of the DynamoDB database.
- `gateway`: An Nginx container that acts as a reverse proxy for the
    `frontend` and `backend` containers, running on `localhost:80`.
