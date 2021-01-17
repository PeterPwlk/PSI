import { Injectable } from '@nestjs/common';
import { ClassRoomRepositoryService } from './class-room-repository.service';
import { ClassRoom } from '../../../../Persistance/Models/classRoom';

@Injectable()
export class ClassRoomService {
  constructor(
    private readonly classRoomRepository: ClassRoomRepositoryService,
  ) {}
  async getAll(): Promise<ClassRoom[]> {
    return this.classRoomRepository.getAll();
  }
  async getById(id: number): Promise<ClassRoom> {
    const response = await this.classRoomRepository.getById(id);
    return response[0];
  }

  async getByClassRoomType(classRoomType: number) {
    return await this.classRoomRepository.getByClassRoomType(classRoomType);
  }
}
