import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Course} from "../Models/course";


export class CourseRepository {
    private readonly tableName = 'Course';
    constructor(private readonly docClient: DocumentClient) {
    }

    async getById(id: number | Course): Promise<Course> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#courseId = :courseId",
            ExpressionAttributeNames: {
                "#courseId": "courseId"
            },
            ExpressionAttributeValues: {
                ":courseId": id
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
    async getAll(): Promise<Course[]> {
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