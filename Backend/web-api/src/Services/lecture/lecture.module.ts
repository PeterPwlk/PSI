import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from '../../Controllers/lecture/lecture.controller';
import { LectureRepositoryService } from './lecture-repository.service';
import { TutorRepositoryService } from '../tutor/tutor-repository.service';

@Module({
  providers: [LectureService, LectureRepositoryService, TutorRepositoryService],
  controllers: [LectureController],
})
export class LectureModule {}
