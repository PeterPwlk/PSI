import { Controller, Get, Param, Query } from '@nestjs/common';
import { LectureScheduleService } from '../../Services/lecture-schedule/lecture-schedule.service';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import {mapToLectureScheduleDTO} from "../../DTO/lectureScheduleDTO";

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
    const response = await this.lectureService.getById(parseInt(id));
    return mapToLectureScheduleDTO([response])[0];
  }
}
