import { LectureSchedule } from "../Models/lectureSchedule";
import { StudiesType } from "../Models/studiesType";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Tutor} from "../Models/tutor";

export class LectureSchedulesRepository {

    constructor(private readonly docClient: DocumentClient) {
    }
    private tableName = "LectureSchedule";
    create(plan: LectureSchedule): void {
        const planParameters = {
            TableName: this.tableName,
            Item:{
                'lectureScheduleId': 1,
                'facultyName': plan.faculty.name,
                'facultyStartYear': 2020,
                'facultyStudiesLevel': plan.faculty.studiesLevel,
                'facultyStudiesType': plan.faculty.studiesType,
                'created': false,
                'plan': plan
            }
        };
        this.docClient.put(planParameters, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    }

    async getById(id: number): Promise<LectureSchedule> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#lectureScheduleId = :lectureScheduleId",
            ExpressionAttributeNames: {
                "#lectureScheduleId": "lectureScheduleId"
            },
            ExpressionAttributeValues: {
                ":lectureScheduleId": id
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

    async getByFacultyId(facultyId: number): Promise<LectureSchedule> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#facultyId = :facultyId",
            ExpressionAttributeNames: {
                "#facultyId": "facultyId"
            },
            ExpressionAttributeValues: {
                ":facultyId": facultyId
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

    async getAllData() : Promise<LectureSchedule[]> {
        const queryParams = {
            TableName : this.tableName
        };
        
        let allPlans;
        try {
            allPlans = await this.docClient.scan(queryParams).promise();
            console.log(allPlans);
        } catch (error) {
            console.log("Error: ",  error);
        }

        return allPlans.Items;
    }

    async getStudiesLevel(studiesType: StudiesType) {
        var queryParams = {
            TableName : "LectureSchedule",
            FilterExpression: "#facultyStudiesType = :facultyStudiesType",
            ExpressionAttributeNames: {
                "#facultyStudiesType": "facultyStudiesType",
            },
            ExpressionAttributeValues: {":facultyStudiesType": studiesType}
        };
        
        let studiesLevels, plansWithStudiesType;
        try {
            plansWithStudiesType = await this.docClient.scan(queryParams).promise();
            studiesLevels = plansWithStudiesType.Items.map(plan => plan.facultyStudiesLevel);
        } catch (error) {
            console.log("Error: ",  error);
        }

        return studiesLevels;
    }

    async getNonCreatedPlans() {
        var queryParams = {
            TableName : "LectureSchedule",
            FilterExpression: "#created = :created",
            ExpressionAttributeNames: {
                "#created": "created",
            },
            ExpressionAttributeValues: {":created": false}
        };
        
        let plansNonCreated;
        try {
            plansNonCreated = await this.docClient.scan(queryParams).promise();
        } catch (error) {
            console.log("Error: ",  error);
        }

        return plansNonCreated.Items;
    }
}