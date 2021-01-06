import { LectureSchedule } from "../Models/lectureSchedule";
import * as AWS from 'aws-sdk';
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
                'lectureScheduleId': 1, //TODO- jak juz bedzie schemat to to pewnie zniknie 
                'plan': plan //TODO -  DANE DO ZMIANY JAK JUZ BEDZIE SCHEMAT
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
}