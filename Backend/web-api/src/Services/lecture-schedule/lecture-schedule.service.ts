import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { LectureScheduleRepository } from './lecture-schedule-repository.service';
import { LectureRepository } from '../../../../Persistance/Repositories/lectureRepository';

@Injectable()
export class LectureScheduleService {
  constructor(
    private lectureScheduleRepository: LectureScheduleRepository,
    lectureRepository: LectureRepository,
  ) {}

  async getAll(): Promise<LectureSchedule[]> {
    const lectureSchedules = await this.lectureScheduleRepository.getAllData();
    lectureSchedules.forEach((lectureSchedule) => {
      console.log(lectureSchedule.lectureScheduleId);
    });
    return;
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
