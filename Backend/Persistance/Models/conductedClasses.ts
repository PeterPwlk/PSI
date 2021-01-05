import {Tutor} from "./tutor";
import {Lecture} from "./lecture";

export interface ConductedClasses {
    startDate: Date;
    endDate: Date;
    lecture: Lecture;
    tutor: Tutor;
}