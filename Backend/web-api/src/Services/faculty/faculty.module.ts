import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyRepositoryService } from './faculty-repository.service';
import { FacultyController } from '../../Controllers/faculty/faculty.controller';

@Module({
  providers: [FacultyService, FacultyRepositoryService],
  controllers: [FacultyController],
})
export class FacultyModule {}
