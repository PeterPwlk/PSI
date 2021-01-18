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

    public static mapToLecture(items: LectureModel[]): Lecture[] {
        return items.map(item => ({
            lectureId: item.lectureId,
            lectureScheduleId: item.lectureScheduleId,
            groupNumber: item.lectureCode,
            courseId: item.courseId,
            lectureTime: item.lectureTime,
            conductedClasses: item.conductedClasses
        }));
    }

    public static mapToLectureModel(items: Lecture[]): LectureModel[] {
        return items.map(item => ({
            lectureId: item.lectureId,
            courseId: item.courseId,
            lectureCode: item.groupNumber,
            lectureTime: item.lectureTime,
            lectureScheduleId: item.lectureScheduleId,
            conductedClasses: item.conductedClasses
        }));
    }

    async create(item: Lecture) {
        const lecture = LectureRepository.mapToLectureModel([item]);
        const params = {
            TableName: this.tableName,
            Item: {
                ...lecture[0]
            }
        };
        let response;
        try {
            response = await this.docClient.put(params).promise();
        } catch (e) {
            console.log(e);
        }
        return response;
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
        return LectureRepository.mapToLecture(response.Items);
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
        return LectureRepository.mapToLecture(response.Items);
    }

    async updateLectureTime(lectureId: number, lectureTime: LectureTime) {
        const query = {
            TableName: this.tableName,
            Key: {
                "lectureId": lectureId
            },
            UpdateExpression: "set #lectureTime = list_append(if_not_exists(#lectureTime, :empty_list), :lectureTime)",
            ExpressionAttributeNames: {
                '#lectureTime': 'lectureTime'
            },
            ExpressionAttributeValues: {
                ':lectureTime': [lectureTime],
                ':empty_list': []
            },
            ReturnValues:"UPDATED_NEW"
        };
        let response;
        try {
            response = await this.docClient.update(query).promise();
        } catch (e) {
            console.log(e);
        }
        return response;
    }

    async updateLectureTutor(lectureId: number, conductedClasses: ConductedClasses) {
        const queryLecture = {
            TableName: this.tableName,
            Key: {
                "lectureId": lectureId
            },
            UpdateExpression: "set #conductedClasses = list_append(if_not_exists(#conductedClasses, :empty_list), :conductedClasses)",
            ExpressionAttributeNames: {
                '#conductedClasses': 'conductedClasses'
            },
            ExpressionAttributeValues: {
                ':conductedClasses': [conductedClasses],
                ':empty_list': []
            },
            ReturnValues:"UPDATED_NEW"
        };
        let response;
        try {
            response = await this.docClient.update(queryLecture).promise();
        } catch (e) {
            console.log(e);
        }
        return response;
    }
}