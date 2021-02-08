import { Test, TestingModule } from '@nestjs/testing';
import { LectureScheduleGeneratorService } from './lecture-schedule-generator.service';
import { LectureType } from '../../../../Persistance/Models/lectureType';
import { LectureForm } from '../../../../Persistance/Models/lectureForm';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { StudentsGroup } from '../../../../Persistance/Models/studentsGroup';
import { Faculty } from '../../../../Persistance/Models/faculty';

describe('LectureScheduleGeneratorService', () => {
  let service: LectureScheduleGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureScheduleGeneratorService],
    }).compile();

    service = module.get<LectureScheduleGeneratorService>(
      LectureScheduleGeneratorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate lectures for lecture form', () => {
    const lectureForm: LectureForm = {
      courseId: 0,
      duration: 90,
      lectureType: LectureType.WykladOgolny,
      numberOfHours: 60,
      numberOfStudentsInGroup: 165,
      course: {
        tutors: [],
        name: 'Analiza matematyczna 1',
        courseNumber: 'KNL-123',
      },
    };

    const result = service.generateLecturesForLectureForm(lectureForm, 300, 1);

    expect(result).toHaveLength(2);
  });

  it('should generate lecture schedule', () => {
    const studentsGroup: StudentsGroup = {
      numberOfStudents: 300,
      semester: 'zimowy',
      speciality: '',
      courses: [
        {
          courseNumber: 'KEK-W23',
          tutors: [4],
          name: 'Analiza matematyczna 1',
          lectureForms: [
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
              },
            },
          ],
        },
      ],
    };

    const faculty: Faculty = {
      facultyId: 0,
      lectureScheduleId: 0,
      name: 'Informatyka',
      startYear: 2021,
      studiesLevel: 0,
      studiesType: 0,
      studentGroups: [studentsGroup],
    };

    const result = service.generate(studentsGroup, faculty);

    expect(result).toHaveProperty('studentGroup', studentsGroup);
    expect(result).toHaveProperty('faculty', faculty);
    expect(result.lectures).toHaveLength(12);
    expect(result.lectures).toContainEqual(
      expect.objectContaining({
        lectureScheduleId: result.lectureScheduleId,
        courseId: 0,
        course: expect.objectContaining({
          numberOfHours: 60,
          duration: 90,
          lectureType: LectureType.CwieczeniaWFormieLektoratu,
        }),
      }),
    );
  });
});
