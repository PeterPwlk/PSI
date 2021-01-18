import { Injectable } from '@nestjs/common';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { LectureRepositoryService } from './lecture-repository.service';
import { LectureTime } from '../../../../Persistance/Models/lectureTime';
import { ConductedClasses } from '../../../../Persistance/Models/conductedClasses';

@Injectable()
export class LectureService {
  constructor(private lectureRepository: LectureRepositoryService) {}

  async getAll(): Promise<Lecture[]> {
    return await this.lectureRepository.getAll();
  }

  async getById(id: number) {
    const response = await this.lectureRepository.getById(id);
    return response[0];
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
