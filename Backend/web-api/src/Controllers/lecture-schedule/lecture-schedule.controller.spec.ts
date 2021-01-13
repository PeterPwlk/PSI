import { Test, TestingModule } from '@nestjs/testing';
import { LectureScheduleController } from './lecture-schedule.controller';

describe('LectureScheduleController', () => {
  let controller: LectureScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureScheduleController],
    }).compile();

    controller = module.get<LectureScheduleController>(LectureScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
