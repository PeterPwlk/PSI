import { LectureSchedule } from "../Models/lectureSchedule";
import { StudiesType } from "../Models/studiesType";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Lecture} from "../Models/lecture";
import {Faculty} from "../Models/faculty";
import {IRepositoryBase, RepositoryBase} from "./repositoryBase";

interface LectureScheduleModel {
    lectureScheduleId: number
    createdTime: string;
    lectures: number[] | Lecture[];
    facultyId: number
}

export class LectureSchedulesRepository extends RepositoryBase<LectureScheduleModel> implements IRepositoryBase<LectureSchedule>{
    private static readonly TableName = "LectureSchedule";
    private static readonly TableKey = "lectureScheduleId";

    constructor(docClient: DocumentClient) {
        super(docClient, LectureSchedulesRepository.TableName, LectureSchedulesRepository.TableKey);
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

    async create(plan: LectureSchedule): Promise<LectureSchedule> {
        const mappedPlan = (LectureSchedulesRepository.mapToLectureScheduleModel([plan]))[0];
        const response = await super.createBase(mappedPlan);
        return (LectureSchedulesRepository.mapToLectureSchedule([response]))[0];
    };

    async getById(id: number): Promise<LectureSchedule> {
        const response = await super.getByIdBase(id);
        return LectureSchedulesRepository.mapToLectureSchedule(response)[0];
    }

    async getAll() : Promise<LectureSchedule[]> {
        const response = await super.getAllBase();
        return LectureSchedulesRepository.mapToLectureSchedule(response);
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

    async getStudiesLevel(studiesType: StudiesType) {
        const queryParams = {
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
        const queryParams = {
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