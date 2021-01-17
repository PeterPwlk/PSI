import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Course} from "../Models/course";
import {Tutor} from "../Models/tutor";


export class TutorRepository {
    private readonly tableName = 'Tutor';
    constructor(private readonly docClient: DocumentClient) {
    }

    async getById(id: number): Promise<Tutor> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#tutorId = :tutorId",
            ExpressionAttributeNames: {
                "#tutorId": "tutorId"
            },
            ExpressionAttributeValues: {
                ":tutorId": id
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
    async getAll(): Promise<Tutor[]> {
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
    async getAllBySuggestedCourseId(courseId: number): Promise<Tutor[]> {
        const query = {
            TableName: this.tableName,
            FilterExpression: "contains(suggestedCourses, :courseId) OR contains(courses, :courseId)",
            ExpressionAttributeValues: {
                ":courseId": courseId,
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