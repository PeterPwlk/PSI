import { FacultyService } from '../faculty/faculty.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LectureScheduleService } from './lecture-schedule.service';
import { LectureScheduleGeneratorService } from './lecture-schedule-generator.service';
import { LectureRepositoryService } from '../lecture/lecture-repository.service';
import { CourseRepositoryService } from '../course/course-repository.service';
import { LectureService } from '../lecture/lecture.service';
import { TutorRepositoryService } from '../tutor/tutor-repository.service';
import { TutorService } from '../tutor/tutor.service';
import { CourseService } from '../course/course.service';
import { ClassRoomService } from '../class-room/class-room.service';
import { ClassRoomRepositoryService } from '../class-room/class-room-repository.service';
import { Faculty } from '../../../../Persistance/Models/faculty';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { StudentsGroup } from '../../../../Persistance/Models/studentsGroup';
import { LectureType } from '../../../../Persistance/Models/lectureType';
import { LectureForm } from '../../../../Persistance/Models/lectureForm';

describe('FacultyService', () => {
  let service: LectureScheduleService;
  let lectureRepository: LectureRepositoryService;
  let lectureScheduleRepository: LectureScheduleRepositoryService;
  let lectureScheduleGenerator: LectureScheduleGeneratorService;
  let facultyRepository: FacultyRepositoryService;
  let courseRepository: CourseRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureScheduleService,
        LectureScheduleRepositoryService,
        FacultyRepositoryService,
        LectureRepositoryService,
        CourseRepositoryService,
        LectureService,
        TutorRepositoryService,
        TutorService,
        CourseService,
        ClassRoomService,
        ClassRoomRepositoryService,
        LectureScheduleGeneratorService,
      ],
    }).compile();

    service = module.get<LectureScheduleService>(LectureScheduleService);
    lectureScheduleRepository = module.get<LectureScheduleRepositoryService>(
      LectureScheduleRepositoryService,
    );
    lectureRepository = module.get<LectureRepositoryService>(
      LectureRepositoryService,
    );
    lectureScheduleGenerator = module.get<LectureScheduleGeneratorService>(
      LectureScheduleGeneratorService,
    );
    facultyRepository = module.get<FacultyRepositoryService>(
      FacultyRepositoryService,
    );
    courseRepository = module.get<CourseRepositoryService>(
      CourseRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create lecture-schedule', async () => {
    const studentsGroup: StudentsGroup = {
      numberOfStudents: 300,
      semester: 'zimowy',
      speciality: 'Informatyka',
      courses: [],
    };

    const lectureForms: LectureForm[] = [
      {
        courseId: 0,
        duration: 90,
        lectureType: LectureType.WykladOgolny,
        numberOfHours: 60,
        numberOfStudentsInGroup: 165,
        course: {
          tutors: [],
          name: 'Analiza matematyczna 1',
          courseNumber: 'KNL-123',
          studentsGroups: [studentsGroup],
        },
      },
      {
        courseId: 0,
        duration: 90,
        lectureType: LectureType.CwieczeniaWFormieLektoratu,
        numberOfHours: 60,
        numberOfStudentsInGroup: 30,
        course: {
          tutors: [],
          name: 'Analiza matematyczna 1',
          courseNumber: 'KNL-123',
          studentsGroups: [studentsGroup],
        },
      },
    ];

    const faculty: Faculty = {
      facultyId: 0,
      lectureScheduleId: 0,
      name: 'Informatyka',
      startYear: 2021,
      studiesLevel: 0,
      studiesType: 0,
      studentGroups: [studentsGroup],
    };
    const generatedLectureSchedule: LectureSchedule = {
      faculty: faculty,
      lectures: [
        {
          courseId: 1,
          lectureId: 1,
          lectureTime: [],
          conductedClasses: [],
          lectureScheduleId: 1,
        },
        {
          courseId: 1,
          lectureId: 1,
          lectureTime: [],
          conductedClasses: [],
          lectureScheduleId: 1,
        },
      ],
      createdTime: '',
      lectureScheduleId: 1,
    };

    const facultyRepositoryMock = jest.spyOn(facultyRepository, 'getById');
    facultyRepositoryMock.mockImplementation(() => Promise.resolve(faculty));

    const facultyRepositorySaveMock = jest.spyOn(facultyRepository, 'create');
    facultyRepositorySaveMock.mockImplementation(() =>
      Promise.resolve({} as Faculty),
    );

    const courseRepositoryMock = jest.spyOn(courseRepository, 'getAll');
    courseRepositoryMock.mockImplementation(() =>
      Promise.resolve(lectureForms),
    );
    const lectureScheduleGeneratorMock = jest.spyOn(
      lectureScheduleGenerator,
      'generate',
    );

    lectureScheduleGeneratorMock.mockImplementation(
      () => generatedLectureSchedule,
    );

    const lectureScheduleRepositoryMock = jest.spyOn(
      lectureScheduleRepository,
      'create',
    );
    lectureScheduleRepositoryMock.mockImplementation(() =>
      Promise.resolve({} as LectureSchedule),
    );

    const lectureRepositoryMock = jest.spyOn(lectureRepository, 'create');
    lectureRepositoryMock.mockImplementation(() =>
      Promise.resolve({} as Lecture),
    );

    const result = await service.create(faculty);
    expect(facultyRepositoryMock).toHaveBeenCalledTimes(1);
    expect(lectureScheduleGeneratorMock).toHaveBeenCalled();
    expect(courseRepositoryMock).toHaveBeenCalled();
    expect(lectureScheduleRepositoryMock).toHaveBeenCalledTimes(1);
    expect(lectureRepositoryMock).toHaveBeenCalledTimes(2);
    expect(facultyRepositorySaveMock).toHaveBeenCalled();

    expect(result.faculty).toBe(faculty);
    expect(result.lectures).toHaveLength(2);
  });
});
