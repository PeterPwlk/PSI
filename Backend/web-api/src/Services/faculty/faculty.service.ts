import {Injectable} from '@nestjs/common';
import {Faculty} from '../../../../Persistance/Models/faculty';
import {FacultyRepositoryService} from './faculty-repository.service';

@Injectable()
export class FacultyService {
  constructor(private facultyRepository: FacultyRepositoryService) {}

  async getAll(): Promise<Faculty[]> {
    return await this.facultyRepository.getAll();
  }

  async getById(id: number) {
    return await this.facultyRepository.getById(id);
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
