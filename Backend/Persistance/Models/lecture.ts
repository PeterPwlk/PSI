import {LectureException} from "./lectureException";
import {LectureTime} from "./lectureTime";
import {ConductedClasses} from "./conductedClasses";

export interface Lecture {
  groupNumber: string;
  stream: number;
  lectureTime: LectureTime[];
  exception: LectureException;
  conductedClasses: ConductedClasses[];
}

