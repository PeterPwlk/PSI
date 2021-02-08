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
    const studentsGroup: StudentsGroup = faculty.studentGroups[1];

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

    const saveLecturesPromise = [];
    for (const l of generatedLectureSchedule.lectures) {
      saveLecturesPromise.push(this.lectureRepository.create(l as Lecture));
    }

    await Promise.all([saveLectureSchedulePromise, ...saveLecturesPromise]);

    return generatedLectureSchedule;
  }
}
