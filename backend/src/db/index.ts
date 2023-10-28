import { DynamoDB, GetItemInput, PutItemInput, TableDescription } from "@aws-sdk/client-dynamodb";
import { dynamoOptions } from "../environment";

//
// This is where the database connections are established. Feel free to
// change this file however you need to.
//
const sharedClient = new DynamoDB({
  endpoint: dynamoOptions.endpoint,
});

export class Db {
  private readonly client: DynamoDB;

  constructor(client = sharedClient) {
    this.client = client;
  }

  async storeUrl(shortCode: string, longUrl: string): Promise<void> {
      const params: PutItemInput = {
          TableName: "URLMappings",
          Item: {
              "ShortCode": { S: shortCode },
              "LongUrl": { S: longUrl }
          }
      };

      await this.client.putItem(params);
  }

  async getUrl(shortCode: string): Promise<string | undefined> {
      const params: GetItemInput = {
          TableName: "URLMappings",
          Key: {
              "ShortCode": { S: shortCode }
          },
          ProjectionExpression: "LongUrl"
      };

      const data = await this.client.getItem(params);

      if (data.Item && data.Item.LongUrl && data.Item.LongUrl.S) {
          return data.Item.LongUrl.S;
      }

      return undefined;
  }
}

export const dbClient = new Db();
