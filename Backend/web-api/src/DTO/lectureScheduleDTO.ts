import { Lecture } from '../../../Persistance/Models/lecture';
import { StudentsGroup } from '../../../Persistance/Models/studentsGroup';
import { Faculty } from '../../../Persistance/Models/faculty';
import { LectureDTO, LectureTimeDTO, mapToLectureDTO } from './lectureDTO';
import { LectureTime } from '../../../Persistance/Models/lectureTime';
import { format } from 'date-fns';
import { WeekDay } from '../../../Persistance/Models/weekDay';
import { WeekType } from '../../../Persistance/Models/weekType';
import { LectureSchedule } from '../../../Persistance/Models/lectureSchedule';

export class LectureScheduleDTO {
  lectureScheduleId: number;
  createdTime: Date | string;
  lectures: LectureDTO[];
  studentGroup?: StudentsGroup;
  faculty: Faculty | number;
}

export function mapToLectureScheduleDTO(
  items: LectureSchedule[],
): LectureScheduleDTO[] {
  return items.map((item) => ({
    ...item,
    lectures: mapToLectureDTO(item.lectures as Lecture[]),
  }));
}
