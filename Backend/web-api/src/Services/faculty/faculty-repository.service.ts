import { Injectable } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { FacultyRepository } from '../../../../Persistance/Repositories/facultyRepository';

@Injectable()
export class FacultyRepositoryService extends FacultyRepository {
  constructor() {
    super(new DocumentClient());
  }
}
