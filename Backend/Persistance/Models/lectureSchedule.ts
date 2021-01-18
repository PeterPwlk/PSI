import {Faculty} from "./faculty";
import {Lecture} from "./lecture";
import {StudentsGroup} from "./studentsGroup";

export interface LectureSchedule {
    lectureScheduleId: number,
    createdTime: Date | string;
    lectures: Lecture[] | number[];
    studentGroup?: StudentsGroup;
    faculty: Faculty | number;
}