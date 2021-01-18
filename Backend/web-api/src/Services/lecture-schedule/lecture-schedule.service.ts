import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';
import { LectureRepositoryService } from '../lecture/lecture-repository.service';

@Injectable()
export class LectureScheduleService {
  constructor(
    private lectureScheduleRepository: LectureScheduleRepositoryService,
    private facultyRepository: FacultyRepositoryService,
    private lectureRepository: LectureRepositoryService,
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
    const lecturesWithDetails = [];
    const lectureSchedule = await this.lectureScheduleRepository.getById(id);
    for (const lectureId of lectureSchedule[0].lectures) {
      const lectureDetails = await this.lectureRepository.getById(lectureId);
      lecturesWithDetails.push(lectureDetails);
    }
    lectureSchedule[0].lectures = lecturesWithDetails;
    return lectureSchedule;
  }

  async getByFacultyId(facultyId: number) {
    const response = await this.lectureScheduleRepository.getByFacultyId(
      facultyId,
    );
    return response[0];
  }
}
