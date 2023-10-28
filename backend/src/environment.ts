//
// This is a configuration file that reads values from the environment,
// and provides them to the rest of the application. This is a good place
// to put things like database connection strings, API keys, etc.
//

export const dynamoOptions = {
  // This is populated by the build process.
  endpoint: process.env.DYNAMO_ENDPOINT ?? "",
};

export const shortCodeLength = parseInt(process.env.SHORT_CODE_LENGTH ?? "5");

export const redisExpiry = parseInt(process.env.REDIS_EXPIRY ?? "86400");

export const redisUrl = process.env.REDIS_URL ?? "";
