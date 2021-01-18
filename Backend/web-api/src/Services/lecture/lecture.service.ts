import { Injectable } from '@nestjs/common';
import { LectureRepository } from '../../../../Persistance/Repositories/lectureRepository';
import { Lecture } from '../../../../Persistance/Models/lecture';

@Injectable()
export class LectureService {
  constructor(private lectureRepository: LectureRepository) {}

  async getAll(): Promise<Lecture[]> {
    return await this.lectureRepository.getAll();
  }

  async getById(id: number) {
    const response = await this.lectureRepository.getById(id);
    return response[0];
  }
}
