import { LectureSchedule } from "../Models/lectureSchedule";
import { StudiesType } from "../Models/studiesType";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Lecture} from "../Models/lecture";
import {Faculty} from "../Models/faculty";

interface LectureScheduleModel {
    lectureScheduleId: number
    createdTime: string;
    lectures: number[] | Lecture[];
    facultyId: number
}

export class LectureSchedulesRepository {

    constructor(private readonly docClient: DocumentClient) {
    }

    public static mapToLectureSchedule(items: LectureScheduleModel[]): LectureSchedule[] {
        return items.map(item => ({
            lectureScheduleId: item.lectureScheduleId,
            lectures: item.lectures,
            createdTime: item.createdTime,
            faculty: item.facultyId
        }));
    }

    public static mapToLectureScheduleModel(items: LectureSchedule[]): LectureScheduleModel[] {
        return items.map(item => {
            return ({
                lectureScheduleId: item.lectureScheduleId,
                createdTime: this.mapDateToString(item.createdTime),
                facultyId: this.mapFacultyId(item.faculty),
                lectures: item.lectures
            });
        });
    }

    private static mapFacultyId(id: number | Faculty): number {
        if(typeof id == "number"){
            return id;
        } else if (id.facultyId){
            return id.facultyId;
        }
    }

    private static mapDateToString(date: Date | string): string {
        if(typeof date == "string"){
            return date;
        } else if(date instanceof Date){
            return  date.toUTCString();
        }
    }

    private tableName = "LectureSchedule";
    async create(plan: LectureSchedule): Promise<void> {
        const mappedPlan = LectureSchedulesRepository.mapToLectureScheduleModel([plan]);
        const params = {
            TableName: this.tableName,
            Item:{
                ...mappedPlan[0]
            }
        };
        let response;
        try {
            response = await this.docClient.put(params).promise();
        } catch (e) {
            console.log(e);
        }
        return response;
    };

    async getById(id: number): Promise<LectureSchedule[]> {
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
        return LectureSchedulesRepository.mapToLectureSchedule(response.Items);
    }

    async getByFacultyId(facultyId: number): Promise<LectureSchedule[]> {
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
        return LectureSchedulesRepository.mapToLectureSchedule(response.Items);
    }

    async getAll() : Promise<LectureSchedule[]> {
        const queryParams = {
            TableName : this.tableName
        };
        
        let response;
        try {
            response = await this.docClient.scan(queryParams).promise();
        } catch (error) {
            console.log("Error: ",  error);
        }

        return LectureSchedulesRepository.mapToLectureSchedule(response.Items);
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