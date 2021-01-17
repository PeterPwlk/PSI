import { Injectable } from '@nestjs/common';
import { CourseRepositoryService } from './course-repository.service';
import { Course } from '../../../../Persistance/Models/course';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepositoryService) {}

  async getAll(): Promise<Course[]> {
    return await this.courseRepository.getAll();
  }

  async getById(id: number): Promise<Course> {
    const response = await this.courseRepository.getById(id);
    return response[0];
  }
}