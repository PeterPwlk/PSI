import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';

@Injectable()
export class LectureScheduleService {
  constructor(
    private lectureScheduleRepository: LectureScheduleRepositoryService,
    private facultyRepository: FacultyRepositoryService,
  ) {}

  async getAll(): Promise<LectureSchedule[]> {
    const lectureSchedules = await this.lectureScheduleRepository.getAll();
    for (const lectureSchedule of lectureSchedules) {
      const facultyDetails = await this.facultyRepository.getById(
        lectureSchedule.faculty,
      );
      lectureSchedule.faculty = facultyDetails[0];
    }
    return lectureSchedules;
  }

  async getById(id: number) {
    const response = await this.lectureScheduleRepository.getById(id);
    return response[0];
  }

  async getByFacultyId(facultyId: number) {
    const response = await this.lectureScheduleRepository.getByFacultyId(
      facultyId,
    );
    return response[0];
  }
}
