import * as AWS from 'aws-sdk';
import {DocumentClient} from "aws-sdk/clients/dynamodb";

export class AwsDataImporter {
    constructor(private readonly repository, private readonly docClient: DocumentClient) {
    }

    async importData(data,tableName: string , mapper: Function = undefined) {
        let importData = data;
        // console.log(importData);
        if(mapper){
            importData = mapper(importData);
        }
        // console.log(importData);
        let itemCreated = 0;
        for (const item of importData) {
            try {
                await this.repository.create(item);
            } catch {
            }
            itemCreated++;
        }
        console.log(`Created ${itemCreated} items ${tableName}`);
        return itemCreated;
    }

    async cleanTable(tableName: string, tableId: string) {
        const allData = await this.repository.getAll();
        if(allData.length == 0){
            console.log(`${tableName} clean`);
            return;
        }

        console.log(`Items in ${tableName} ${allData.length}`);
        let deletedItems = 0;
        for (const item of allData) {
            // console.log(item);
            const params = {
                TableName: tableName,
                Key: {
                    [tableId]: item[tableId]
                }
            };
            const res = await this.docClient.delete(params);
            deletedItems++;
        }
        console.log(`Deleted ${deletedItems} items in ${tableName}`);
        return deletedItems;
    }
}