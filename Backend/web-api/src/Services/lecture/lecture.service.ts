import { Injectable } from '@nestjs/common';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { LectureRepositoryService } from './lecture-repository.service';
import { TutorRepositoryService } from '../tutor/tutor-repository.service';

@Injectable()
export class LectureService {
  constructor(
    private lectureRepository: LectureRepositoryService,
    private readonly tutorRepository: TutorRepositoryService,
  ) {}

  async getAll(): Promise<Lecture[]> {
    return await this.lectureRepository.getAll();
  }

  async getById(id: number): Promise<Lecture> {
    const response = await this.lectureRepository.getById(id);
    const lecture = response[0];
    const conductedClassesPromises = lecture.conductedClasses.map(
      async (conductedClass) => {
        conductedClass.tutor = await this.tutorRepository.getById(
          conductedClass.tutorId,
        );
        return conductedClass;
      },
    );
    lecture.conductedClasses = await Promise.all(conductedClassesPromises);
    return lecture;
  }
}
