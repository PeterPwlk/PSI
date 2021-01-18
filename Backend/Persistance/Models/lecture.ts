import {LectureException} from "./lectureException";
import {LectureTime} from "./lectureTime";
import {ConductedClasses} from "./conductedClasses";
import {Course} from "./course";

export interface Lecture {
  lectureId: number,
  lectureScheduleId: number,
  courseId: number | Course,
  groupNumber: string;
  stream?: number;
  lectureTime: LectureTime[];
  exception?: LectureException;
  conductedClasses: ConductedClasses[];
}

