import { Injectable } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { LectureRepository } from '../../../../Persistance/Repositories/lectureRepository';

@Injectable()
export class LectureRepositoryService extends LectureRepository {
  constructor() {
    super(new DocumentClient());
  }
}
