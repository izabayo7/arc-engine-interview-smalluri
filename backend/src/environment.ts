//
// This is a configuration file that reads values from the environment,
// and provides them to the rest of the application. This is a good place
// to put things like database connection strings, API keys, etc.
//

export const dynamoOptions = {
  // This is populated by the build process.
  endpoint: process.env.DYNAMO_ENDPOINT ?? "",
};
