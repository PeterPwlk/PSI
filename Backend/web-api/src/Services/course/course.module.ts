import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseRepositoryService } from './course-repository.service';
import { CourseController } from '../../Controllers/course/course.controller';

@Module({
  providers: [CourseService, CourseRepositoryService],
  controllers: [CourseController],
})
export class CourseModule {}
