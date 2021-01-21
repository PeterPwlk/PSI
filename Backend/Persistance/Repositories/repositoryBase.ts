import {DocumentClient} from "aws-sdk/clients/dynamodb";

export interface IRepositoryBase<T> {
    create(item: T): Promise<T>;
    getById(id: number): Promise<T>;
    getAll(): Promise<T[]>;
}

export abstract class RepositoryBase<T> {
    protected constructor(
        protected readonly docClient: DocumentClient,
        protected readonly tableName: string,
        protected readonly tablePrimaryKey: string) {
    }

    protected async getByIdBase(id: number): Promise<T[]> {
        const query: DocumentClient.QueryInput = {
            TableName: this.tableName,
            KeyConditionExpression: "#primaryKey = :primaryKey",
            ExpressionAttributeNames: {
                "#primaryKey": this.tablePrimaryKey
            },
            ExpressionAttributeValues: {
                ":primaryKey": id
            }
        };
        let response: DocumentClient.QueryOutput;
        try {
            response = await this.docClient.query(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items as T[];
    }

    protected async getAllBase(): Promise<T[]> {
        const query: DocumentClient.ScanInput = {
            TableName: this.tableName,
        };
        let response: DocumentClient.ScanOutput;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items as T[];
    }

    protected async createBase(item: T): Promise<T> {
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: item
        };
        let response: DocumentClient.PutItemOutput;
        try {
            response = await this.docClient.put(params).promise();
        } catch (e) {
            console.log(e);
        }
        return item;
    }

}