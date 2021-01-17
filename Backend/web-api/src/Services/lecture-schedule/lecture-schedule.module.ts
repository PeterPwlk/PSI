import { Module } from '@nestjs/common';
import { LectureScheduleService } from './lecture-schedule.service';
import { LectureScheduleController } from '../../Controllers/lecture-schedule/lecture-schedule.controller';
import { LectureScheduleRepository } from './lecture-schedule-repository.service';

@Module({
  providers: [LectureScheduleRepository, LectureScheduleService],
  controllers: [LectureScheduleController],
})
export class LectureScheduleModule {}
