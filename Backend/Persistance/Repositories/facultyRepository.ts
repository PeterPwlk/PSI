import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Faculty} from "../Models/faculty";
import {LectureSchedule} from "../Models/lectureSchedule";
import {IRepositoryBase, RepositoryBase} from "./repositoryBase";

export class FacultyRepository extends RepositoryBase<Faculty> implements IRepositoryBase<Faculty>{
    private static readonly TableName = "Faculty";
    private static readonly TableKey = 'facultyId';

    constructor(docClient: DocumentClient) {
        super(docClient, FacultyRepository.TableName, FacultyRepository.TableKey);
    }

    async create(item: Faculty): Promise<Faculty> {
        return await super.createBase(item);
    }

    async getById(id: number): Promise<Faculty> {
        const response = await super.getByIdBase(id);
        return response[0];
    }

    async getAll(): Promise<Faculty[]> {
        return await super.getAllBase();
    }

    async getByLectureScheduleId(lectureScheduleId: number): Promise<Faculty> {
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
        let response: DocumentClient.ScanOutput;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response.Items;
    }
}

