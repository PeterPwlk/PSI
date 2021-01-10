import { LectureSchedule } from "../Models/lectureSchedule";
import * as AWS from 'aws-sdk';
import { StudiesLevel } from "../Models/studiesLevel";
import { StudiesType } from "../Models/studiesType";
AWS.config.loadFromPath('./dynamoDbCredentials.json');

export interface ILectureSchedulesRepository {
    create(plan: LectureSchedule): void;
}

export class LectureSchedulesRepository implements ILectureSchedulesRepository {

    private docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

    create(plan: LectureSchedule): void {
        const planParameters = {
            TableName: 'LectureSchedule',
            Item:{
                'facultyName': plan.faculty.name,
                'facultyStartYear': plan.faculty.startYear,
                'facultyStudiesLevel': plan.faculty.studiesLevel,
                'facultyStudiesType': plan.faculty.studiesType,
                'createdTime': plan.createdTime,
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

    async getPlanDetails(facultyName: string, startYear: number, studiesLevel: StudiesLevel, studiesType: StudiesType, createdTime: Date) {
        var queryParams = {
            TableName : "LectureSchedule",
            KeyConditionExpression: "#facultyName = :facultyName",
            FilterExpression: "#facultyStudiesType = :facultyStudiesType AND #facultyStartYear = :facultyStartYear AND #facultyStudiesLevel = :facultyStudiesLevel AND #createdTime = :createdTime",
            ExpressionAttributeNames: {
                "#facultyStudiesType": "facultyStudiesType",
                "#facultyName": "facultyName",
                "#facultyStartYear": "facultyStartYear",
                "#facultyStudiesLevel": "facultyStudiesLevel",
                "#createdTime": "createdTime"
            },
            ExpressionAttributeValues: { 
                ":facultyStudiesType": studiesType,
                ":facultyName": facultyName,
                ":facultyStartYear": startYear,
                ":facultyStudiesLevel": studiesLevel,
                ":createdTime": createdTime
            }
        };
        
        let planDetails;
        try {
            planDetails = await this.docClient.query(queryParams).promise();
        } catch (error) {
            console.log("Error: ",  error);
        }

        return planDetails.Items;
    }

    async getAllData() {
        var queryParams = {
            TableName : "LectureSchedule"
        };
        
        let allPlans;
        try {
            allPlans = await this.docClient.scan(queryParams).promise();
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
            ExpressionAttributeValues: { ":facultyStudiesType": studiesType}
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
}