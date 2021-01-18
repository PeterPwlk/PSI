import {LectureException} from "./lectureException";
import {LectureTime} from "./lectureTime";
import {ConductedClasses} from "./conductedClasses";
import {LectureForm} from "./lectureForm";

export interface Lecture {
  lectureId: number,
  lectureScheduleId: number,
  courseId: number,
  course?: LectureForm,
  groupNumber?: string;
  stream?: number;
  lectureTime: LectureTime[];
  exception?: LectureException;
  conductedClasses: ConductedClasses[];
}

