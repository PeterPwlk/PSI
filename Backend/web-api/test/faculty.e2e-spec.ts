import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { FacultyModule } from '../src/Services/faculty/faculty.module';
import { FacultyRepositoryService } from '../src/Services/faculty/faculty-repository.service';
import { LectureScheduleRepositoryService } from '../src/Services/lecture-schedule/lecture-schedule-repository.service';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';

describe('FacultyController', () => {
  let app: INestApplication;
  const facultyRepositoryMock = {
    getAll: () => [
      {
        facultyId: 0,
        lectureScheduleId: 1,
        name: 'Informatyka',
        startYear: 2021,
        studiesLevel: 0,
        studiesType: 0,
        studentGroups: [],
      },
      {
        facultyId: 1,
        lectureScheduleId: 0,
        name: 'Informatyka',
        startYear: 2021,
        studiesLevel: 0,
        studiesType: 0,
        studentGroups: [],
      },
    ],
  };
  const lectureSchedulesRepositoryMock = {
    getAll: () => [
      {
        lectureScheduleId: 1,
        faculty: {
          facultyId: 0,
          lectureScheduleId: 1,
          name: 'Informatyka',
          startYear: 2021,
          studiesLevel: 0,
          studiesType: 0,
          studentGroups: [],
        },
        lectures: [],
        createdTime: '',
      },
    ],
  };
  const AuthGuard = {
    canActivate: () => true,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FacultyModule],
    })
      .overrideProvider(FacultyRepositoryService)
      .useValue(facultyRepositoryMock)
      .overrideProvider(LectureScheduleRepositoryService)
      .useValue(lectureSchedulesRepositoryMock)
      .overrideGuard(JwtAuthGuard)
      .useValue(AuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET faculties/filter', () => {
    const expected = [
      {
        facultyId: 1,
        lectureScheduleId: 0,
        name: 'Informatyka',
        startYear: 2021,
        studiesLevel: 0,
        studiesType: 0,
        studentGroups: [],
      },
    ];

    return request(app.getHttpServer())
      .get('/faculty/filter')
      .expect(200)
      .expect(expected);
  });

  afterAll(async () => {
    await app.close();
  });
});
