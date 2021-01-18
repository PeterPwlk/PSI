import {LectureException} from "./lectureException";
import {LectureTime} from "./lectureTime";
import {ConductedClasses} from "./conductedClasses";
import {Course} from "./course";

export interface Lecture {
  lectureId: number,
  lectureScheduleId: number,
  courseId: number,
  course?: Course,
  lectureCode: string,
  groupNumber?: string;
  stream?: number;
  lectureTime: LectureTime[];
  exception?: LectureException;
  conductedClasses: ConductedClasses[];
}

