import { Injectable } from '@nestjs/common';
import { TutorRepositoryService } from './tutor-repository.service';

@Injectable()
export class TutorService {
  constructor(private readonly tutorRepository: TutorRepositoryService) {}

  async getAll() {
    return await this.tutorRepository.getAll();
  }

  async getById(id: number) {
    return await this.tutorRepository.getById(id);
  }

  async getAllBySuggestedCourseId(courseId: number) {
    return await this.tutorRepository.getAllBySuggestedCourseId(courseId);
  }
}
