import { DynamoDB, TableDescription } from "@aws-sdk/client-dynamodb";
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

  async getTableNames(): Promise<string[] | undefined> {
    const data = await this.client.listTables({});
    return data.TableNames;
  }

  async getTableDescription(
    tableName: string,
  ): Promise<TableDescription | undefined> {
    const data = await this.client.describeTable({ TableName: tableName });
    return data.Table;
  }
}

export const dbClient = new Db();
