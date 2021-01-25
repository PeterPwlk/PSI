import { Test, TestingModule } from '@nestjs/testing';
import { ClassRoomService } from './class-room.service';
import { ClassRoomRepositoryService } from './class-room-repository.service';
import { ClassRoom } from '../../../../Persistance/Models/classRoom';
import { ClassRoomType } from '../../../../Persistance/Models/classRoomType';

describe('ClassRoomService', () => {
  let service: ClassRoomService;
  let repository: ClassRoomRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassRoomService, ClassRoomRepositoryService],
    }).compile();

    service = module.get<ClassRoomService>(ClassRoomService);
    repository = module.get<ClassRoomRepositoryService>(
      ClassRoomRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return class-room by id', async () => {
    const expected: ClassRoom = {
      number: '134',
      building: 'A1',
      capacity: 300,
      classRoomId: 1,
      classRoomType: ClassRoomType.Lecture,
    };

    const spyInstance = jest.spyOn(repository, 'getById');
    spyInstance.mockImplementation(() => Promise.resolve(expected));

    expect(await service.getById(1)).toBe(expected);
    expect(spyInstance).toBeCalled();
  });

  it('should return all class-rooms', async () => {
    const expected: ClassRoom[] = [
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
    ];

    const spyInstance = jest.spyOn(repository, 'getAll');
    spyInstance.mockImplementation(() => Promise.resolve(expected));

    expect(await service.getAll()).toBe(expected);
    expect(spyInstance).toBeCalled();
  });

  it('should return class-room by id', async () => {
    const expected: ClassRoom[] = [
      {
        number: '134',
        building: 'A1',
        capacity: 300,
        classRoomId: 1,
        classRoomType: ClassRoomType.Lecture,
      },
    ];

    const spyInstance = jest.spyOn(repository, 'getByClassRoomType');
    spyInstance.mockImplementation(() => Promise.resolve(expected));

    expect(await service.getByClassRoomType(1)).toBe(expected);
    expect(spyInstance).toBeCalled();
  });
});
