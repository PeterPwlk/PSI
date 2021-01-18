import { Module } from '@nestjs/common';
import { LectureScheduleService } from './lecture-schedule.service';
import { LectureScheduleController } from '../../Controllers/lecture-schedule/lecture-schedule.controller';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';

@Module({
  providers: [LectureScheduleService, LectureScheduleRepositoryService],
  controllers: [LectureScheduleController],
})
export class LectureScheduleModule {}
