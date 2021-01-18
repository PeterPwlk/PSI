import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from '../../Controllers/lecture/lecture.controller';
import { LectureRepositoryService } from './lecture-repository.service';
import { TutorRepositoryService } from '../tutor/tutor-repository.service';
import { TutorService } from '../tutor/tutor.service';
import { CourseService } from '../course/course.service';
import { CourseRepositoryService } from '../course/course-repository.service';

@Module({
  providers: [
    LectureService,
    LectureRepositoryService,
    TutorService,
    TutorRepositoryService,
    CourseRepositoryService,
    CourseService,
  ],
  controllers: [LectureController],
})
export class LectureModule {}
