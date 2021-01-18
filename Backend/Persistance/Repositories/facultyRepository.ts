import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Faculty} from "../Models/faculty";
import {LectureSchedule} from "../Models/lectureSchedule";

export class FacultyRepository {

    constructor(private readonly docClient: DocumentClient) {
    }
    private tableName = "Faculty";

    async getById(id: number): Promise<Faculty> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#facultyId = :facultyId",
            ExpressionAttributeNames: {
                "#facultyId": "facultyId"
            },
            ExpressionAttributeValues: {
                ":facultyId": id
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

    async getByLectureScheduleId(lectureScheduleId: number): Promise<LectureSchedule> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#lectureScheduleId = :lectureScheduleId",
            ExpressionAttributeNames: {
                "#lectureScheduleId": "lectureScheduleId"
            },
            ExpressionAttributeValues: {
                ":lectureScheduleId": lectureScheduleId
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

    async getAll(): Promise<Faculty[]> {
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

    async getByStudiesType(studiesType: number) {
        const query = {
            TableName : this.tableName,
            FilterExpression: "#studiesType = :studiesType",
            ExpressionAttributeNames: {
                "#studiesType": "studiesType"
            },
            ExpressionAttributeValues: {
                ":studiesType": studiesType
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

    async getByStudiesLevel(studiesLevel: number) {
        const query = {
            TableName : this.tableName,
            FilterExpression: "#studiesLevel = :studiesLevel",
            ExpressionAttributeNames: {
                "#studiesLevel": "studiesLevel"
            },
            ExpressionAttributeValues: {
                ":studiesLevel": studiesLevel
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

