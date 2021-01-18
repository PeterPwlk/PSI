import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Lecture} from "../Models/lecture";

export class LectureRepository {

    constructor(private readonly docClient: DocumentClient) {
    }
    private tableName = "Lecture";

    async getById(id: number): Promise<Lecture> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#lectureId = :lectureId",
            ExpressionAttributeNames: {
                "#lectureId": "lectureId"
            },
            ExpressionAttributeValues: {
                ":lectureId": id
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

    async getAll(): Promise<Lecture[]> {
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
}