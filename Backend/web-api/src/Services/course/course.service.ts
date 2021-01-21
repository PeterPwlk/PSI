import { Injectable } from '@nestjs/common';
import { CourseRepositoryService } from './course-repository.service';
import { LectureForm } from '../../../../Persistance/Models/lectureForm';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepositoryService) {}

  async getAll(): Promise<LectureForm[]> {
    return await this.courseRepository.getAll();
  }

  async getById(id: number): Promise<LectureForm> {
    return await this.courseRepository.getById(id);
  }
}
