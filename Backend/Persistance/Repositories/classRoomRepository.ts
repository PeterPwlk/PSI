import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {ClassRoom} from "../Models/classRoom";

export class ClassRoomRepository {
    constructor(private readonly docClient: DocumentClient) {
    }
    private tableName = "ClassRoom";
    async create(classRoom : ClassRoom) {
        const params = {
            TableName: this.tableName,
            Item: {
                ...classRoom
            }
        };
        let response;
        try {
            response = await this.docClient.put(params).promise();
        } catch (e) {
            console.log(e);
        }
        return response;
    }
    async getById(id: number): Promise<ClassRoom[]> {
        const query = {
            TableName : this.tableName,
            KeyConditionExpression: "#classRoomId = :classRoomId",
            ExpressionAttributeNames: {
                "#classRoomId": "classRoomId"
            },
            ExpressionAttributeValues: {
                ":classRoomId": id
            }
        };
        let response;
        try {
           response = await this.docClient.query(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items;
    }
    async getAll() : Promise<ClassRoom[]> {
        const query = {
            TableName: this.tableName
        };
        let response;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items;
    }
    async getByClassRoomType(classRoomType: number) {
        const query = {
            TableName : this.tableName,
            FilterExpression: "#classRoomType = :classRoomType",
            ExpressionAttributeNames: {
                "#classRoomType": "classRoomId"
            },
            ExpressionAttributeValues: {
                ":classRoomType": classRoomType
            }
        };
        let response;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items;
    }
}