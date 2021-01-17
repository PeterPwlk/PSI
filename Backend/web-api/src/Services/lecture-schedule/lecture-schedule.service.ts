import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { LectureScheduleRepository } from './lecture-schedule-repository.service';

@Injectable()
export class LectureScheduleService {
  constructor(private repository: LectureScheduleRepository) {}
  async getAll(): Promise<LectureSchedule[]> {
    return this.repository.getAllData();
  }
}
