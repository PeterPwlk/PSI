import { Injectable } from '@nestjs/common';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { LectureRepositoryService } from './lecture-repository.service';
import { LectureTime } from '../../../../Persistance/Models/lectureTime';
import { ConductedClasses } from '../../../../Persistance/Models/conductedClasses';
import { TutorService } from '../tutor/tutor.service';

@Injectable()
export class LectureService {
  constructor(
    private lectureRepository: LectureRepositoryService,
    private readonly tutorRepository: TutorService,
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
    return lecture;
  }

  async updateLectureTime(lectureId: number, lectureTime: LectureTime) {
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
