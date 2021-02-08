import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { CourseRepositoryService } from '../course/course-repository.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';
import { LectureRepositoryService } from '../lecture/lecture-repository.service';
import { LectureService } from '../lecture/lecture.service';
import { Faculty } from '../../../../Persistance/Models/faculty';
import { StudentsGroup } from '../../../../Persistance/Models/studentsGroup';
import { LectureScheduleGeneratorService } from './lecture-schedule-generator.service';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { LectureForm } from '../../../../Persistance/Models/lectureForm';
import { Course } from '../../../../Persistance/Models/course';

@Injectable()
export class LectureScheduleService {
  constructor(
    private lectureScheduleRepository: LectureScheduleRepositoryService,
    private facultyRepository: FacultyRepositoryService,
    private lectureRepository: LectureRepositoryService,
    private courseRepository: CourseRepositoryService,
    private lectureService: LectureService,
    private lectureScheduleGenerator: LectureScheduleGeneratorService,
  ) {}

  async getAll(): Promise<LectureSchedule[]> {
    const lectureSchedules = await this.lectureScheduleRepository.getAll();
    const lectureSchedulesPromises = lectureSchedules.map(async (item) => ({
      ...item,
      faculty: await this.facultyRepository.getById(item.faculty as number),
    }));
    return await Promise.all(lectureSchedulesPromises);
  }

  async getById(id: number): Promise<LectureSchedule> {
    const lectureSchedule = await this.lectureScheduleRepository.getById(id);
    const lectureDetailsPromises = [];

    for (const lecture of lectureSchedule.lectures) {
      if (typeof lecture == 'number') {
        lectureDetailsPromises.push(this.lectureService.getById(lecture));
      }
    }

    lectureSchedule.lectures = await Promise.all(lectureDetailsPromises);
    return lectureSchedule;
  }

  async getByFacultyId(facultyId: number) {
    const response = await this.lectureScheduleRepository.getByFacultyId(
      facultyId,
    );
    return response[0];
  }

  async create(chosenFaculty: Faculty): Promise<LectureSchedule> {
    const faculty = await this.facultyRepository.getById(
      chosenFaculty.facultyId,
    );
    const studentsGroup: StudentsGroup = faculty.studentGroups[0];
    const allLectureForms = await this.courseRepository.getAll();
    const filteredLectureForms = allLectureForms.filter(
      (l) =>
        l.course.studentsGroups[0] &&
        l.course.studentsGroups[0].speciality === studentsGroup.speciality,
    );
    studentsGroup.courses = LectureScheduleService.mergeLectureFormsToCourses(
      filteredLectureForms,
    );

    const generatedLectureSchedule = this.lectureScheduleGenerator.generate(
      studentsGroup,
      faculty,
    );

    const lectureIds = [];
    for (const l of generatedLectureSchedule.lectures) {
      lectureIds.push((l as Lecture).lectureId);
    }

    const lectureSchedule = {
      ...generatedLectureSchedule,
      lectures: lectureIds,
    };
    const saveLectureSchedulePromise = this.lectureScheduleRepository.create(
      lectureSchedule,
    );

    faculty.lectureScheduleId = generatedLectureSchedule.lectureScheduleId;
    const saveFacultyPromise = this.facultyRepository.create(faculty);

    const saveLecturesPromise = [];
    for (const l of generatedLectureSchedule.lectures) {
      saveLecturesPromise.push(this.lectureRepository.create(l as Lecture));
    }

    await Promise.all([
      saveLectureSchedulePromise,
      saveFacultyPromise,
      ...saveLecturesPromise,
    ]);

    return generatedLectureSchedule;
  }

  private static mergeLectureFormsToCourses(
    lectureForms: LectureForm[],
  ): Course[] {
    const courses: Course[] = [];
    for (const lectureForm of lectureForms) {
      const course = courses.find((c) => c.name === lectureForm.course.name);
      if (course) {
        course.lectureForms.push({
          lectureType: lectureForm.lectureType,
          numberOfStudentsInGroup: lectureForm.numberOfStudentsInGroup,
          duration: lectureForm.duration,
          numberOfHours: lectureForm.numberOfHours,
          course: undefined,
        });
      } else {
        const newCourse: Course = {
          lectureForms: [],
          courseNumber: lectureForm.course.courseNumber,
          name: lectureForm.course.name,
          tutors: [],
        };
        newCourse.lectureForms.push({
          lectureType: lectureForm.lectureType,
          numberOfStudentsInGroup: lectureForm.numberOfStudentsInGroup,
          duration: lectureForm.duration,
          numberOfHours: lectureForm.numberOfHours,
          course: undefined,
        });
        courses.push(newCourse);
      }
    }
    return courses;
  }
}
