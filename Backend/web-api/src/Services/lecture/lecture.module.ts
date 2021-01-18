import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from '../../Controllers/lecture/lecture.controller';
import { LectureRepositoryService } from './lecture-repository.service';
import { TutorRepositoryService } from '../tutor/tutor-repository.service';
import { TutorService } from '../tutor/tutor.service';

@Module({
  providers: [
    LectureService,
    LectureRepositoryService,
    TutorService,
    TutorRepositoryService,
  ],
  controllers: [LectureController],
})
export class LectureModule {}
