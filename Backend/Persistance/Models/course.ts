import {Tutor} from "./tutor";
import {StudentsGroup} from "./studentsGroup";
import {LectureForm} from "./lectureForm";

export interface Course {
    name: string;
    courseNumber: string;
    lectureForms?: LectureForm[];
    tutors: Tutor[] | Array<number>;
    studentsGroups?: StudentsGroup[];
}