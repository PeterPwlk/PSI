import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Lecture} from "../Models/lecture";
import {LectureTime} from "../Models/lectureTime";
import {ConductedClasses} from "../Models/conductedClasses";
import {parse, parseISO} from "date-fns";
import {ClassRoom} from "../Models/classRoom";
import {Tutor} from "../Models/tutor";

interface LectureModel {
    lectureId: number
    lectureScheduleId: number;
    courseId: number;
    lectureCode: string;
    lectureTime: LectureTimeModel[];
    conductedClasses: ConductedClassesModel[]
}

interface ConductedClassesModel {
    tutor: Tutor;
    startDate: string;
    endDate: string;
}

interface LectureTimeModel {
    startTime: string;
    endTime: string;
    classRoomId?: number;
    day: number;
    weekType: number;
    classRoom: ClassRoom;
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
            lectureTime: this.mapToLectureTime(item.lectureTime),
            conductedClasses: this.mapConductedClasses(item.conductedClasses),
        }));
    }

    public static mapConductedClasses(conductedClasses: ConductedClassesModel[]): ConductedClasses[] {
        return conductedClasses.map(value => ({
            startDate: parseISO(value.startDate),
            endDate: parseISO(value.endDate),
            tutor: value.tutor,
        }))
    }

    public static mapToLectureTimeModel(lectureTime: LectureTime[]): LectureTimeModel[] {
        return lectureTime.map(item => ({
            startTime: item.startTime.toISOString(),
            endTime: item.endTime.toISOString(),
            day: item.day,
            weekType: item.weekType,
            classRoom: item.classRoom
        }))
    }

    public static mapToLectureTime(lectureTimeModel: LectureTimeModel[]): LectureTime[] {
        return lectureTimeModel.map(item => ({
            startTime: parseISO(item.startTime),
            endTime: parseISO(item.endTime),
            day: item.day,
            weekType: item.weekType,
            classRoom: item.classRoom
        }))
    }

    public static mapToConductedClassesModel(conductedClasses: ConductedClasses[]): ConductedClassesModel[] {
        return conductedClasses.map(value => ({
            tutor: value.tutor,
            startDate: value.startDate.toISOString(),
            endDate: value.endDate.toISOString()
        }))
    }

    public static mapToLectureModel(items: Lecture[]): LectureModel[] {
        return items.map(item => ({
            lectureId: item.lectureId,
            courseId: item.courseId,
            lectureCode: item.groupNumber,
            lectureTime: this.mapToLectureTimeModel(item.lectureTime),
            lectureScheduleId: item.lectureScheduleId,
            conductedClasses: this.mapToConductedClassesModel(item.conductedClasses)
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
        const lectureTimeModel = LectureRepository.mapToLectureTimeModel([lectureTime]);
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
                ':lectureTime': [lectureTimeModel[0]],
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
        return LectureRepository.mapToLectureTime(response.Attributes.lectureTime);
    }

    async updateLectureTutor(lectureId: number, conductedClasses: ConductedClasses) {
        const conductedClassesModel = LectureRepository.mapToConductedClassesModel([conductedClasses]);
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
                ':conductedClasses': [conductedClassesModel[0]],
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
        return LectureRepository.mapConductedClasses(response.Attributes.conductedClasses);
    }
}
