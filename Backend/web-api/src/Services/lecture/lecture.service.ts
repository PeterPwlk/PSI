import { Injectable } from '@nestjs/common';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { LectureRepositoryService } from './lecture-repository.service';

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
}
