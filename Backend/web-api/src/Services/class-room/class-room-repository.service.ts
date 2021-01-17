import { Injectable } from '@nestjs/common';
import { ClassRoomRepository } from '../../../../Persistance/Repositories/classRoomRepository';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class ClassRoomRepositoryService extends ClassRoomRepository {
  constructor() {
    super(new DocumentClient());
  }
}
