import { Injectable } from '@nestjs/common';
import { FacultyRepository } from '../../../../Persistance/Repositories/facultyRepository';
import { Faculty } from '../../../../Persistance/Models/faculty';
import { FacultyRepositoryService } from './faculty-repository.service';

@Injectable()
export class FacultyService {
  constructor(private facultyRepository: FacultyRepositoryService) {}

  async getAll(): Promise<Faculty[]> {
    return await this.facultyRepository.getAll();
  }

  async getById(id: number) {
    const response = await this.facultyRepository.getById(id);
    return response[0];
  }

  async getByLectureScheduleId(lectureScheduleId: number) {
    const response = await this.facultyRepository.getByLectureScheduleId(
      lectureScheduleId,
    );
    return response[0];
  }

  async getByStudiesType(studiesType: number) {
    return await this.facultyRepository.getByStudiesType(studiesType);
  }

  async getByStudiesLevel(studiesLevel: number) {
    return await this.facultyRepository.getByStudiesLevel(studiesLevel);
  }
}
