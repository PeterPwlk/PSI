import { Injectable } from '@nestjs/common';
import { Faculty } from '../../../../Persistance/Models/faculty';
import { FacultyRepositoryService } from './faculty-repository.service';
import { LectureScheduleRepositoryService } from '../lecture-schedule/lecture-schedule-repository.service';

@Injectable()
export class FacultyService {
  constructor(
    private facultyRepository: FacultyRepositoryService,
    private lectureScheduleRepository: LectureScheduleRepositoryService,
  ) {}

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

  async getAllWithoutLectureSchedule(): Promise<Faculty[]> {
    const allFaculties = await this.facultyRepository.getAll();
    const allLectureSchedules = await this.lectureScheduleRepository.getAll();
    const emptyFaculties = allFaculties.filter(
      (f) =>
        !allLectureSchedules.find(
          (s) => s.lectureScheduleId === f.lectureScheduleId,
        ),
    );
    return emptyFaculties;
  }
}
