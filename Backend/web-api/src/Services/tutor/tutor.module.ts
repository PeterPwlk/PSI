import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorRepositoryService } from './tutor-repository.service';
import { TutorController } from '../../Controllers/tutor/tutor.controller';

@Module({
  providers: [TutorService, TutorRepositoryService],
  controllers: [TutorController],
})
export class TutorModule {}
