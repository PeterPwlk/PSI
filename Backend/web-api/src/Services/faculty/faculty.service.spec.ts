import { Test, TestingModule } from '@nestjs/testing';
import { FacultyService } from './faculty.service';
import { FacultyRepositoryService } from './faculty-repository.service';
import { LectureScheduleRepositoryService } from '../lecture-schedule/lecture-schedule-repository.service';
import { Faculty } from '../../../../Persistance/Models/faculty';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';

describe('FacultyService', () => {
  let service: FacultyService;
  let facultyRepository: FacultyRepositoryService;
  let lectureScheduleRepository: LectureScheduleRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacultyService,
        FacultyRepositoryService,
        LectureScheduleRepositoryService,
      ],
    }).compile();

    service = module.get<FacultyService>(FacultyService);
    facultyRepository = module.get<FacultyRepositoryService>(
      FacultyRepositoryService,
    );
    lectureScheduleRepository = module.get<LectureScheduleRepositoryService>(
      LectureScheduleRepositoryService,
    );
  });

  it('should return all faculties without lecture schedule', async () => {
    const facultiesMock: Faculty[] = [
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
    ];

    const lectureScheduleMock: LectureSchedule[] = [
      {
        lectureScheduleId: 1,
        faculty: facultiesMock[0],
        lectures: [],
        createdTime: '',
      },
    ];

    const facultyRepositoryMock = jest.spyOn(facultyRepository, 'getAll');
    facultyRepositoryMock.mockImplementation(() =>
      Promise.resolve(facultiesMock),
    );

    const lectureScheduleRepositoryMock = jest.spyOn(
      lectureScheduleRepository,
      'getAll',
    );
    lectureScheduleRepositoryMock.mockImplementation(() =>
      Promise.resolve(lectureScheduleMock),
    );

    const result = await service.getAllWithoutLectureSchedule();
    expect(result).toHaveLength(1);
    expect(result).toContain(facultiesMock[1]);
  });
});
