import {Faculty} from "./faculty";
import {Lecture} from "./lecture";
import {StudentsGroup} from "./studentsGroup";

export interface LectureSchedule {
    createdTime: Date;
    lectures: Lecture[];
    studentGroup: StudentsGroup;
    faculty: Faculty;
}