import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyRepositoryService } from './faculty-repository.service';
import { FacultyController } from '../../Controllers/faculty/faculty.controller';
import { LectureScheduleRepositoryService } from '../lecture-schedule/lecture-schedule-repository.service';
import { LectureScheduleService } from '../lecture-schedule/lecture-schedule.service';
import { LectureScheduleModule } from '../lecture-schedule/lecture-schedule.module';

@Module({
  providers: [
    FacultyService,
    FacultyRepositoryService,
    LectureScheduleRepositoryService,
  ],
  controllers: [FacultyController],
})
export class FacultyModule {}
