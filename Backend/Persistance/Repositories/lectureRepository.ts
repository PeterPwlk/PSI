import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Lecture} from "../Models/lecture";
import {LectureTime} from "../Models/lectureTime";
import {ConductedClasses} from "../Models/conductedClasses";

interface LectureModel {
    lectureId: number
    lectureScheduleId: number;
    courseId: number;
    lectureCode: string;
    lectureTime: LectureTime[];
    conductedClasses: ConductedClasses[]
}
export class LectureRepository {

    constructor(private readonly docClient: DocumentClient) {
    }
    private tableName = "Lecture";

    public static mapToLectureRepository(items: LectureModel[]): Lecture[] {
        return items.map(item => ({
            lectureId: item.lectureId,
            lectureScheduleId: item.lectureScheduleId,
            lectureCode: item.lectureCode,
            courseId: item.courseId,
            lectureTime: item.lectureTime,
            conductedClasses: item.conductedClasses
        }));
    }

    async getById(id: number | Lecture): Promise<Lecture[]> {
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
        return LectureRepository.mapToLectureRepository(response.Items);
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
        return LectureRepository.mapToLectureRepository(response.Items);
    }

    async update(): Promise<Lecture[]> {
        const query = {
            TableName: this.tableName
        };
        let response;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return LectureRepository.mapToLectureRepository(response.Items);
    }
}