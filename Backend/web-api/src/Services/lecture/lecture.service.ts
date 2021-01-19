import { Injectable } from '@nestjs/common';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { LectureRepositoryService } from './lecture-repository.service';
import { LectureTime } from '../../../../Persistance/Models/lectureTime';
import { ConductedClasses } from '../../../../Persistance/Models/conductedClasses';
import { TutorService } from '../tutor/tutor.service';
import { CourseService } from '../course/course.service';
import { LectureTimeDTO } from '../../DTO/lectureTimeDTO';
import { WeekDay } from '../../../../Persistance/Models/weekDay';
import { WeekType } from '../../../../Persistance/Models/weekType';
import { addMinutes, parse } from 'date-fns';
import { ClassRoomService } from '../class-room/class-room.service';

@Injectable()
export class LectureService {
  constructor(
    private lectureRepository: LectureRepositoryService,
    private readonly tutorRepository: TutorService,
    private readonly courseService: CourseService,
    private readonly classRoomService: ClassRoomService,
  ) {}

  async getAll(): Promise<Lecture[]> {
    return await this.lectureRepository.getAll();
  }

  async getById(id: number): Promise<Lecture> {
    const response = await this.lectureRepository.getById(id);
    const lecture = response[0];
    const conductedClassesPromises = lecture.conductedClasses
      .filter((conductedClass) => conductedClass.tutorId)
      .map(async (conductedClass) => {
        conductedClass.tutor = await this.tutorRepository.getById(
          conductedClass.tutorId,
        );
        return conductedClass;
      });
    lecture.conductedClasses = await Promise.all(conductedClassesPromises);
    lecture.course = await this.courseService.getById(lecture.courseId);
    return lecture;
  }

  async updateLectureTime(lectureId: number, lectureTimeDTO: LectureTimeDTO) {
    const lectureTimeMap = LectureTimeDTOMapper.mapToLectureTime([
      lectureTimeDTO,
    ]);
    const classRoom = await this.classRoomService.getById(
      lectureTimeDTO.classRoom,
    );
    const lectureTime = lectureTimeMap[0];
    lectureTime.classRoom = classRoom;
    return await this.lectureRepository.updateLectureTime(
      lectureId,
      lectureTime,
    );
  }

  async updateLectureTutor(
    lectureId: number,
    conductedClasses: ConductedClasses,
  ) {
    return await this.lectureRepository.updateLectureTutor(
      lectureId,
      conductedClasses,
    );
  }
}

class LectureTimeDTOMapper {
  public static mapToLectureTime(items: LectureTimeDTO[]): LectureTime[] {
    return items.map((item) => {
      const startTime = parse(item.startTime, 'HH:mm:ss', new Date());
      return {
        classRoomId: item.classRoom,
        day: WeekDay[item.day],
        weekType: WeekType[item.weekType],
        startTime: startTime,
        endTime: addMinutes(startTime, item.duration),
      };
    });
  }
}
