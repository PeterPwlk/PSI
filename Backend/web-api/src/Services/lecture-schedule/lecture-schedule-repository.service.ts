import { Injectable } from '@nestjs/common';
import { LectureSchedulesRepository } from '../../../../Persistance/Repositories/lectureShedulesRepository';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class LectureScheduleRepository extends LectureSchedulesRepository {
  constructor() {
    super(new DocumentClient());
  }
}
