import {LectureType} from "./lectureType";
import {NumberAttributeValue} from "aws-sdk/clients/dynamodbstreams";
import {Course} from "./course";

export interface LectureForm {
    courseId: number,
    numberOfHours: number;
    lectureType: LectureType;
    numberOfStudentsInGroup: number;
    duration: number;
    course: Course;
}