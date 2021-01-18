import {StudiesType} from "./studiesType";
import {StudiesLevel} from "./studiesLevel";
import {StudentsGroup} from "./studentsGroup";

export interface Faculty {
    facultyId: number;
    lectureScheduleId: number;
    studiesType: StudiesType;
    studiesLevel: StudiesLevel;
    name: string;
    startYear: number;
    studentGroups: StudentsGroup[];
}