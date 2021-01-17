import { TutorRepository } from '../../../../Persistance/Repositories/tutorRepository';
import { Injectable } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class TutorRepositoryService extends TutorRepository {
  constructor() {
    super(new DocumentClient());
  }
}
