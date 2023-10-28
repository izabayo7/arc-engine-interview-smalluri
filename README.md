# Arc Engine Interview Repo

Hello! If you're seeing this repo, then you're probably working on a coding
challenge for Arc XP's PageBuilder Engine team.

The goal of this project is to test your problem-solving ability in a complex
coding environment. Specifically, this will test your comfort and experience
with (in no particular order):

1. [Docker](https://docker.com)
2. [NodeJS](https://nodejs.org/en/) (v16)
3. [TypeScript](https://www.typescriptlang.org/)
4. [ReactJS](https://reactjs.org/)
5. [Express](https://expressjs.com/)
6. [Lambda](https://aws.amazon.com/lambda/)
7. [DynamoDB](https://aws.amazon.com/dynamodb/)

We would also like to see how you use code-quality systems like:

1. [Jest](https://jestjs.io/)
2. [StandardJS](https://standardjs.com/)

## The Challenge

The challenge is to build a simple web application that allows users to provide
a "long" URL through the frontend, and receive a "short" URL that redirects to
the original URL (similar to [tinyUrl](https://tinyurl.com/app)). The total
time for this challenge should not exceed 2-3 hours.

There are a few minimum requirements for this coding challenge to begin with,
however, we encourage you demonstrate your mastery and knowledge of other
technologies by expanding this application in any way you see fit, as mentioned
in the `Further Suggestions` section. We welcome any additional features and
creative thoughts, as well as novel technical approaches.

### Minimum Requirements

- The application should be able to accept a URL from the frontend, and
  generate a short URL that redirects to the original URL.

```
(e.g.)

   INPUT: https://www.washingtonpost.com/public-relations/arc-publishing/
   
   becomes
   
   OUTPUT: https://localhost:8081/abc1234567890
```

- The application should be able to accept a short URL from the frontend, and
  redirect to the original URL.

```
(e.g.)

   INPUT: https://localhost:8081/abc1234567890
   
   redirects to
   
   OUTPUT: https://www.washingtonpost.com/public-relations/arc-publishing/
```

- The application's UI should be written in ReactJS, and should be able to
  communicate with the backend through an API.
- The application's backend should store the original URL and the short URL in
  a DynamoDB table, with a schema of your choosing stored in the
  `./infrastructure/dynamo/tables` folder.

### Suggestions

- The application may log the results of some/all requests with enough
  information for debugging.
- The application may use a cache or other performance optimization to reduce
  the number of DynamoDB requests.
- The application may have a way to remove short URLs from the database.
- The application may use tests to verify important functionality.
- Anything else you think would be cool!

## Getting Started

To get started, you'll need to have [Docker](https://docker.com) and
[Docker-Compose](https://docs.docker.com/compose/gettingstarted/) installed on
your host machine. You can then start the project with the following command:

```bash
npm run start
```

This will start the project in development mode. You can then visit
[http://localhost](http://localhost) to see the project running (an Nginx
container will be running on port 80).

## Project Structure

The project is split into three main parts: the `frontend`, the `backend`,
and the `infrastructure`. Each of these parts is contained in its own
directory, and each directory has its own `README.md` file that describes
the contents of that directory.

### Frontend

The frontend is a ReactJS application that is running on port 8080. It is
served by the `frontend` container, and runs in development mode by default.

### Backend

The backend is an Express application that is running on port 8081. It is
served by the `backend` container, and runs in development mode by default.

### Infrastructure

The infrastructure is a set of Docker containers that are used to run the
project. These containers are defined in the `docker-compose.yml` file, and
are used to run the project in development mode.

## Testing

To run the tests for the project, you can run the following command:

```bash
npm run test
```

This will run the tests for the project on your local machine. Feel free to
add new tests to the project as you see fit.
