import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LectureScheduleService } from '../../Services/lecture-schedule/lecture-schedule.service';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { mapToLectureScheduleDTO } from '../../DTO/lectureScheduleDTO';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Faculty } from '../../../../Persistance/Models/faculty';

@Controller('lecture-schedule')
export class LectureScheduleController {
  constructor(private lectureService: LectureScheduleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<LectureSchedule[]> {
    return await this.lectureService.getAll();
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  public async getByCourseId(@Query('facultyId') facultyId) {
    return await this.lectureService.getByFacultyId(parseInt(facultyId));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id') id) {
    const response = await this.lectureService.getById(parseInt(id));
    return mapToLectureScheduleDTO([response])[0];
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createLectureSchedule(
    @Body() studentsGroup: Faculty,
  ): Promise<LectureSchedule> {
    return await this.lectureService.create(studentsGroup);
  }
}
