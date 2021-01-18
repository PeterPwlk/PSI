import * as AWS from 'aws-sdk';
import {DocumentClient} from "aws-sdk/clients/dynamodb";

export class AwsDataImporter {
    constructor(private readonly repository, private readonly docClient: DocumentClient) {
    }

    async importData(data, mapper : Function = undefined) {
        let importData = data;
        console.log(importData);
        if(mapper){
            importData = mapper(importData);
        }
        console.log(importData);
        let itemCreated = 0;
        for (const item of importData) {
            const res = await this.repository.create(item);
            console.log(res);
            itemCreated++;
            console.log(`Created ${itemCreated} items`);
        }
        return itemCreated;
    }

    async cleanTable(tableName: string, tableId: string) {
        const allData = await this.repository.getAll();
        if(allData.length == 0){
            console.log('Table clean');
            return;
        }

        console.log(`Items in table ${allData.length}`);
        let deletedItems = 0;
        for (const item of allData) {
            console.log(item);
            const params = {
                TableName: tableName,
                Key: {
                    [tableId]: item[tableId]
                }
            };
            const res = await this.docClient.delete(params);
            // console.log(res);
            deletedItems++;
        }
        console.log(`Deleted ${deletedItems} items`);
        return deletedItems;
    }
}