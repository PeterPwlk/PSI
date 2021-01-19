import { LectureForm } from '../../../Persistance/Models/lectureForm';
import { LectureTime } from '../../../Persistance/Models/lectureTime';
import { LectureException } from '../../../Persistance/Models/lectureException';
import { ConductedClasses } from '../../../Persistance/Models/conductedClasses';
import { ClassRoom } from '../../../Persistance/Models/classRoom';
import { Tutor } from '../../../Persistance/Models/tutor';
import { WeekDay } from '../../../Persistance/Models/weekDay';
import { WeekType } from '../../../Persistance/Models/weekType';
import { format } from 'date-fns';
import { Lecture } from '../../../Persistance/Models/lecture';

export class LectureDTO {
  lectureId: number;
  lectureScheduleId: number;
  courseId: number;
  course?: LectureForm;
  groupNumber?: string;
  stream?: number;
  lectureTime: LectureTimeDTO[];
  exception?: LectureException;
  conductedClasses: ConductedClassesDTO[];
}

export class LectureTimeDTO {
  startTime: string;
  endTime: string;
  day: number;
  weekType: number;
  classRoom: ClassRoom;
}

export class ConductedClassesDTO {
  tutorId: number;
  tutor?: Tutor;
  startDate: string;
  endDate: string;
}

export function mapToLectureTimeDTO(items: LectureTime[]): LectureTimeDTO[] {
  return items.map((item) => ({
    startTime: format(item.startTime, 'HH:mm:ss'),
    endTime: format(item.endTime, 'HH:mm:ss'),
    day: parseInt(WeekDay[item.day]),
    weekType: parseInt(WeekType[item.weekType]),
    classRoom: item.classRoom,
  }));
}

export function mapToConductedClassesDTO(
  items: ConductedClasses[],
): ConductedClassesDTO[] {
  return items.map((item) => ({
    tutorId: item.tutorId,
    tutor: item?.tutor,
    startDate: format(item.startDate, 'yyyy-MM-dd'),
    endDate: format(item.endDate, 'yyyy-MM-dd'),
  }));
}

export function mapToLectureDTO(items: Lecture[]): LectureDTO[] {
  return items.map((item) => ({
    ...item,
    lectureTime: mapToLectureTimeDTO(item.lectureTime),
    conductedClasses: mapToConductedClassesDTO(item.conductedClasses),
  }));
}
