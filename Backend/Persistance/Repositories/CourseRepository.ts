import {DocumentClient, ScanInput} from "aws-sdk/clients/dynamodb";
import {Course} from "../Models/course";
import {LectureForm} from "../Models/lectureForm";
import {Tutor} from "../Models/tutor";
import {IRepositoryBase, RepositoryBase} from "./repositoryBase";
import {StudentsGroup} from "../Models/studentsGroup";

interface CourseModel {
    courseId: number,
    name: string,
    courseNumber: string,
    numberOfHours: number,
    lectureType: number,
    numberOfStudentsInGroup: number,
    duration: number,
    studentGroups?: StudentsGroup,
    tutors: Array<number> | Tutor[]
}

export class CourseRepository extends RepositoryBase<CourseModel> implements IRepositoryBase<LectureForm>{
    private static readonly TableName = 'Course';
    private static readonly TableKey = 'courseId';

    constructor(docClient: DocumentClient) {
        super(docClient, CourseRepository.TableName, CourseRepository.TableKey)
    }

    async create(course: LectureForm) {
        const courseModel = CourseRepository.mapToCourseModel([course])[0];
        const response = await super.createBase(courseModel);
        return CourseRepository.mapToLectureForm([response])[0];
    }

    async getById(id: number): Promise<LectureForm> {
        const response = await super.getByIdBase(id);
        return CourseRepository.mapToLectureForm(response)[0];
    }
    async getAll(): Promise<LectureForm[]> {
        const response = await super.getAllBase();
        return CourseRepository.mapToLectureForm(response);
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
                courseNumber: item.courseNumber,
                studentsGroups: [item.studentGroups]
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
            courseId: item.courseId,
            studentGroups: item.course.studentsGroups[0]
        }));
    }
}