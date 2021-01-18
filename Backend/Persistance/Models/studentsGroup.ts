import {Course} from "./course";
import {LectureSchedule} from "./lectureSchedule";

export interface StudentsGroup {
    speciality: string;
    numberOfStudents: number;
    semester: string;
    courses?: Course[];
    lectureSchedule?: LectureSchedule;
}