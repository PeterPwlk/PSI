import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { LectureRepositoryService } from '../lecture/lecture-repository.service';

@Injectable()
export class LectureScheduleService {
  constructor(
    private lectureScheduleRepository: LectureScheduleRepositoryService,
    private lectureRepository: LectureRepositoryService,
  ) {}

  async getAll(): Promise<LectureSchedule[]> {
    const lectureSchedules = await this.lectureScheduleRepository.getAllData();
    lectureSchedules.forEach((lectureSchedule) => {
      lectureSchedule.lectures.forEach((lecture) => {
        console.log(lecture);
      });
    });
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
