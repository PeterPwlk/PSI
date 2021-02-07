import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {Lecture} from "../Models/lecture";
import {LectureTime} from "../Models/lectureTime";
import {ConductedClasses} from "../Models/conductedClasses";
import {parse, parseISO} from "date-fns";
import {ClassRoom} from "../Models/classRoom";
import {Tutor} from "../Models/tutor";
import {IRepositoryBase, RepositoryBase} from "./repositoryBase";

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

function mapToLectureTime(lectureTimeModel: LectureTimeModel[]): LectureTime[]  {
    return lectureTimeModel.map(item => ({
        startTime: parseISO(item.startTime),
        endTime: parseISO(item.endTime),
        day: item.day,
        weekType: item.weekType,
        classRoom: item.classRoom
    }))
}

function mapConductedClasses(conductedClasses: ConductedClassesModel[]): ConductedClasses[] {
    return conductedClasses.map(value => ({
        startDate: parseISO(value.startDate),
        endDate: parseISO(value.endDate),
        tutor: value.tutor,
    }))
}

function mapToLectureTimeModel(lectureTime: LectureTime[]): LectureTimeModel[] {
    return lectureTime.map(item => ({
        startTime: item.startTime.toISOString(),
        endTime: item.endTime.toISOString(),
        day: item.day,
        weekType: item.weekType,
        classRoom: item.classRoom
    }))
}

function mapToConductedClassesModel(conductedClasses: ConductedClasses[]): ConductedClassesModel[] {
    return conductedClasses.map(value => ({
        tutor: value.tutor,
        startDate: value.startDate.toISOString(),
        endDate: value.endDate.toISOString()
    }))
}

export class LectureRepository
    extends RepositoryBase<LectureModel>
    implements IRepositoryBase<Lecture> {
    private static readonly TableName = "Lecture";
    private static readonly TableKey = 'lectureId';
    constructor(docClient: DocumentClient) {
        super(docClient, LectureRepository.TableName, LectureRepository.TableKey)
    }

    public static mapToLecture(items: LectureModel[]): Lecture[] {
        return items.map(item => ({
            lectureId: item.lectureId,
            lectureScheduleId: item.lectureScheduleId,
            groupNumber: item.lectureCode,
            courseId: item.courseId,
            lectureTime: mapToLectureTime(item.lectureTime),
            conductedClasses: mapConductedClasses(item.conductedClasses),
        }));
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
            lectureTime: mapToLectureTimeModel(item.lectureTime),
            lectureScheduleId: item.lectureScheduleId,
            conductedClasses: mapToConductedClassesModel(item.conductedClasses)
        }));
    }

    async create(item: Lecture): Promise<Lecture> {
        const lectureModel = LectureRepository.mapToLectureModel([item])[0];
        const response = await super.createBase(lectureModel);
        return LectureRepository.mapToLecture([response])[0];
    }

    async getById(id: number): Promise<Lecture> {
        const response = await super.getByIdBase(id);
        return LectureRepository.mapToLecture(response)[0];
    }

    async getAll(): Promise<Lecture[]> {
        const response = await super.getAllBase();
        return LectureRepository.mapToLecture(response);
    }

    async updateLectureTime(lectureId: number, lectureTime: LectureTime): Promise<LectureTime[]> {
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
        return mapToLectureTime(response.Attributes.lectureTime);
    }

    async replaceLectureTime(lectureId: number, lectureTime: LectureTime[]): Promise<LectureTime[]> {
        const lectureTimeModel = LectureRepository.mapToLectureTimeModel(lectureTime);
        const query = {
            TableName: this.tableName,
            Key: {
                "lectureId": lectureId
            },
            UpdateExpression: "set #lectureTime = list_append(:empty_list, :lectureTime)",
            ExpressionAttributeNames: {
                '#lectureTime': 'lectureTime'
            },
            ExpressionAttributeValues: {
                ':lectureTime': lectureTimeModel,
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
        return mapToLectureTime(response.Attributes.lectureTime);
    }

    async updateLectureTutor(lectureId: number, conductedClasses: ConductedClasses): Promise<ConductedClasses[]> {
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
        return mapConductedClasses(response.Attributes.conductedClasses);
    }

    async replaceLectureTutor(lectureId: number, conductedClasses: ConductedClasses[]): Promise<ConductedClasses[]> {
        const conductedClassesModel = LectureRepository.mapToConductedClassesModel(conductedClasses);
        const queryLecture = {
            TableName: this.tableName,
            Key: {
                "lectureId": lectureId
            },
            UpdateExpression: "set #conductedClasses = list_append(:empty_list, :conductedClasses)",
            ExpressionAttributeNames: {
                '#conductedClasses': 'conductedClasses'
            },
            ExpressionAttributeValues: {
                ':conductedClasses': conductedClassesModel,
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
        return mapConductedClasses(response.Attributes.conductedClasses);
    }
}
