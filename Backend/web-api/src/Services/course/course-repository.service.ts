import { CourseRepository } from '../../../../Persistance/Repositories/CourseRepository';
import { Injectable } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class CourseRepositoryService extends CourseRepository {
  constructor() {
    super(new DocumentClient());
  }
}
