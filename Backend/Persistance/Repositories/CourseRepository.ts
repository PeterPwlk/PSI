import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Course} from "../Models/course";
import {LectureForm} from "../Models/lectureForm";
import {Tutor} from "../Models/tutor";

interface CourseModel {
    courseId: number,
    name: string,
    courseNumber: string,
    numberOfHours: number,
    lectureType: number,
    numberOfStudentsInGroup: number,
    duration: number,
    tutors: Array<number> | Tutor[]
}

export class CourseRepository {
    private readonly tableName = 'Course';
    constructor(private readonly docClient: DocumentClient) {
    }
    async create(course: LectureForm) {
        const params = {
            TableName: this.tableName,
            Item: {
                "courseId": course.courseId,
                "name": course.course.name,
                "courseNumber": course.course.courseNumber,
                "numberOfHours": course.numberOfHours,
                "lectureType": course.lectureType,
                "numberOfStudentsInGroup": course.numberOfStudentsInGroup,
                "duration": course.duration,
                "tutors": course.course.tutors
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
    async getById(id: number): Promise<LectureForm[]> {
        const query = {
            TableName: this.tableName,
            KeyConditionExpression: "#courseId = :courseId",
            ExpressionAttributeNames: {
                "#courseId": "courseId"
            },
            ExpressionAttributeValues: {
                ":courseId": id
            }
        };
        let response;
        try {
            response = await this.docClient.query(query).promise();
        } catch (e) {
            console.log(e);
        }
        return CourseRepository.mapToLectureForm(response.Items);
    }
    async getAll(): Promise<LectureForm[]> {
        const query = {
            TableName: this.tableName
        };
        let response;
        try {
            response = await this.docClient.scan(query).promise();
        } catch (e) {
            console.log(e);
        }
        return CourseRepository.mapToLectureForm(response.Items);
    }
    public static mapToLectureForm(items: CourseModel[]): LectureForm[]{
        return items.map(item => ({
            courseId: item.courseId,
            numberOfHours: item.numberOfHours,
            duration: item.duration,
            lectureType: item.lectureType,
            numberOfStudentsInGroup: item.numberOfStudentsInGroup,
            course: {
                name: item.name,
                tutors: item.tutors,
                courseNumber: item.courseNumber
            }
        }))
    }
    public static mapToCourseModel(items: LectureForm[]): CourseModel[]{
        return items.map(item => ({
            courseNumber: item.course.courseNumber,
            tutors: item.course.tutors,
            name: item.course.name,
            numberOfStudentsInGroup: item.numberOfStudentsInGroup,
            lectureType: item.lectureType,
            duration: item.duration,
            numberOfHours: item.numberOfHours,
            courseId: item.courseId
        }));
    }
}