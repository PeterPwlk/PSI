import { Controller, Get } from '@nestjs/common';
import { LectureScheduleService } from '../../Services/lecture-schedule/lecture-schedule.service';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';

@Controller('lecture-schedule')
export class LectureScheduleController {
  constructor(private service: LectureScheduleService) {}

  @Get()
  async getAll(): Promise<LectureSchedule[]> {
    return await this.service.getAll();
  }
}
