import { Injectable } from '@nestjs/common';
import { LectureSchedulesRepository } from '../../../../Persistance/Repositories/lectureShedulesRepository';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class LectureScheduleRepositoryService extends LectureSchedulesRepository {
  constructor() {
    super(new DocumentClient());
  }
}
