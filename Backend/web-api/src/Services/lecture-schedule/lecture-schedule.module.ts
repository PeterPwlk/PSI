import { Module } from '@nestjs/common';
import { LectureScheduleService } from './lecture-schedule.service';
import { LectureScheduleController } from '../../Controllers/lecture-schedule/lecture-schedule.controller';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';
import { LectureRepositoryService } from '../lecture/lecture-repository.service';
import { CourseRepositoryService } from '../course/course-repository.service';
import { LectureService } from '../lecture/lecture.service';
import { TutorRepositoryService } from '../tutor/tutor-repository.service';
import { TutorService } from '../tutor/tutor.service';
import { CourseService } from '../course/course.service';
import { ClassRoomService } from '../class-room/class-room.service';
import { ClassRoomRepositoryService } from '../class-room/class-room-repository.service';
import { LectureScheduleGeneratorService } from './lecture-schedule-generator.service';

@Module({
  providers: [
    LectureScheduleService,
    LectureScheduleRepositoryService,
    FacultyRepositoryService,
    LectureRepositoryService,
    CourseRepositoryService,
    LectureService,
    TutorRepositoryService,
    TutorService,
    CourseService,
    ClassRoomService,
    ClassRoomRepositoryService,
    LectureScheduleGeneratorService,
    TutorRepositoryService,
  ],
  controllers: [LectureScheduleController],
})
export class LectureScheduleModule {}
