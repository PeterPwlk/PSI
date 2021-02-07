import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassRoomType } from '../../Persistance/Models/classRoomType';
import { ClassRoomRepositoryService } from '../src/Services/class-room/class-room-repository.service';
import { ClassRoomModule } from '../src/Services/class-room/class-room.module';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';

describe('ClassRoomController', () => {
  let app: INestApplication;
  const classRoomRepository = {
    getAll: () => [
      {
        number: '134',
        building: 'A1',
        capacity: 300,
        classRoomId: 1,
        classRoomType: ClassRoomType.Lecture,
      },
      {
        number: '134',
        building: 'A1',
        capacity: 300,
        classRoomId: 1,
        classRoomType: ClassRoomType.Lecture,
      },
    ],
    getById: () => ({
      number: '134',
      building: 'A1',
      capacity: 300,
      classRoomId: 1,
      classRoomType: ClassRoomType.Lecture,
    }),
    getByClassRoomType: () => ({
      number: '134',
      building: 'A1',
      capacity: 300,
      classRoomId: 1,
      classRoomType: ClassRoomType.Lecture,
    }),
  };
  const AuthGuard = {
    canActivate: () => true,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClassRoomModule],
    })
      .overrideProvider(ClassRoomRepositoryService)
      .useValue(classRoomRepository)
      .overrideGuard(JwtAuthGuard)
      .useValue(AuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET class-room', () => {
    return request(app.getHttpServer())
      .get('/class-room')
      .expect(200)
      .expect(classRoomRepository.getAll());
  });

  it('/GET class-room/:id', () => {
    return request(app.getHttpServer())
      .get('/class-room/1')
      .expect(200)
      .expect(classRoomRepository.getById());
  });

  it('/GET class-room/filter?classRoomType', () => {
    return request(app.getHttpServer())
      .get('/class-room/filter?classRoomType=0')
      .expect(200)
      .expect(classRoomRepository.getById());
  });

  afterAll(async () => {
    await app.close();
  });
});
