import { Test, TestingModule } from '@nestjs/testing';
import { LectureScheduleService } from './lecture-schedule.service';

describe('LectureScheduleService', () => {
  let service: LectureScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureScheduleService],
    }).compile();

    service = module.get<LectureScheduleService>(LectureScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
