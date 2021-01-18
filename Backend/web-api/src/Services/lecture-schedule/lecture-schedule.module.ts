import { Module } from '@nestjs/common';
import { LectureScheduleService } from './lecture-schedule.service';
import { LectureScheduleController } from '../../Controllers/lecture-schedule/lecture-schedule.controller';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';

@Module({
  providers: [
    LectureScheduleService,
    LectureScheduleRepositoryService,
    FacultyRepositoryService,
  ],
  controllers: [LectureScheduleController],
})
export class LectureScheduleModule {}
