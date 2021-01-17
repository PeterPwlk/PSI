import { Module } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { ClassRoomRepositoryService } from './class-room-repository.service';
import { ClassRoomController } from '../../Controllers/class-room/class-room.controller';

@Module({
  providers: [ClassRoomService, ClassRoomRepositoryService],
  controllers: [ClassRoomController],
})
export class ClassRoomModule {}
