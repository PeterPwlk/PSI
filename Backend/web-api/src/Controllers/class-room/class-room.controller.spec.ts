import { Test, TestingModule } from '@nestjs/testing';
import { ClassRoomController } from './class-room.controller';

describe('ClassRoomController', () => {
  let controller: ClassRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassRoomController],
    }).compile();

    controller = module.get<ClassRoomController>(ClassRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
