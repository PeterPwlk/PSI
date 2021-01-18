import {Course} from "./course";
import {LectureForm} from "./lectureForm";
import {ConductedClasses} from "./conductedClasses";
import {TutorAvailability} from "./tutorAvailability";

export interface Tutor {
  tutorId: number,
  firstName: string;
  lastName: string;
  title: string;
  pensum: number;
  position: string;
  workingTime: number;
  councilOpinion: boolean;
  availabilities: TutorAvailability[];
  suggestedLectures: LectureForm[];
  courses: Course[];
  conductedClasses: ConductedClasses[];
}

