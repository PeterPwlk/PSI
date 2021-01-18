import { Controller, Get, Param, Query } from '@nestjs/common';
import { LectureScheduleService } from '../../Services/lecture-schedule/lecture-schedule.service';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';

@Controller('lecture-schedule')
export class LectureScheduleController {
  constructor(private lectureService: LectureScheduleService) {}

  @Get()
  async getAll(): Promise<LectureSchedule[]> {
    return await this.lectureService.getAll();
  }

  @Get('filter')
  public async getByCourseId(@Query('facultyId') facultyId) {
    return await this.lectureService.getByFacultyId(parseInt(facultyId));
  }

  @Get(':id')
  public async getById(@Param('id') id) {
    return await this.lectureService.getById(parseInt(id));
  }
}
