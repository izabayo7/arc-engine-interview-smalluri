import { DynamoDB, GetItemInput, PutItemInput, ScanInput, TableDescription, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { dynamoOptions } from "../environment";
import logger from "../utils/logger";
import { client } from "../utils/redis";

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
        "LongUrl": { S: longUrl },
        "createdAt": { N: new Date().getTime().toString() }
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

  async deleteUrl(shortCode: string): Promise<void> {
    const params: GetItemInput = {
      TableName: "URLMappings",
      Key: {
        "ShortCode": { S: shortCode }
      },
      ProjectionExpression: "LongUrl"
    };

    await this.client.deleteItem(params);
  }

  async deleteExpiredUrls(seconds: number): Promise<void> {
    const date = new Date();
    date.setSeconds(date.getSeconds() - seconds);

    const params: ScanInput = {
      TableName: "URLMappings",
      ProjectionExpression: "ShortCode, LongUrl",
      FilterExpression: "createdAt < :dateTime",
      ExpressionAttributeValues: {
        ":dateTime": { N: date.getTime().toString() }
      }
    };

    const data = await this.client.scan(params);

    
    const redisKeysToDelete: any = [];
    
    if (data.Items && data.Items.length > 0) {
      logger.info(`Deleting ${data.Items?.length} expired URL${data.Items?.length === 1 ? '' : 's'}}`);

      // Split items into chunks of 25 for batchWrite
      const chunks = Math.ceil(data.Items.length / 25);
      for (let i = 0; i < chunks; i++) {
        const chunkedItems = data.Items.slice(i * 25, (i + 1) * 25);
        const deleteRequests = chunkedItems.map(item => {
          // Storing this shortCode & URL for Redis deletion
          redisKeysToDelete.push(item.ShortCode.toString());
          redisKeysToDelete.push(item.LongUrl.toString());

          return {
            DeleteRequest: {
              Key: {
                "ShortCode": item.ShortCode
              }
            }
          }
        });

        const batchWriteParams = {
          RequestItems: {
            "URLMappings": deleteRequests
          }
        };

        // Deleting keys from Redis
        await client.del(...redisKeysToDelete);

        await this.client.batchWriteItem(batchWriteParams);
      }
    }
  }
}

export const dbClient = new Db();
