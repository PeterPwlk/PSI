import { Module } from '@nestjs/common';
import { LectureScheduleService } from './lecture-schedule.service';
import { LectureScheduleController } from '../../Controllers/lecture-schedule/lecture-schedule.controller';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';
import { LectureRepositoryService } from '../lecture/lecture-repository.service';
import { CourseRepositoryService } from '../course/course-repository.service';

@Module({
  providers: [
    LectureScheduleService,
    LectureScheduleRepositoryService,
    FacultyRepositoryService,
    LectureRepositoryService,
    CourseRepositoryService,
  ],
  controllers: [LectureScheduleController],
})
export class LectureScheduleModule {}
