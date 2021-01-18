import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { LectureScheduleRepositoryService } from './lecture-schedule-repository.service';
import { FacultyRepositoryService } from '../faculty/faculty-repository.service';
import { LectureRepositoryService } from '../lecture/lecture-repository.service';
import { CourseRepositoryService } from '../course/course-repository.service';
import { Lecture } from '../../../../Persistance/Models/lecture';

@Injectable()
export class LectureScheduleService {
  constructor(
    private lectureScheduleRepository: LectureScheduleRepositoryService,
    private facultyRepository: FacultyRepositoryService,
    private lectureRepository: LectureRepositoryService,
    private courseRepository: CourseRepositoryService,
  ) {}

  async getAll(): Promise<LectureSchedule[]> {
    const lectureSchedules = await this.lectureScheduleRepository.getAll();
    for (const lectureSchedule of lectureSchedules) {
      const facultyDetails = await this.facultyRepository.getById(
        lectureSchedule.faculty,
      );
      lectureSchedule.faculty = facultyDetails[0];
    }
    return lectureSchedules;
  }

  async getById(id: number): Promise<LectureSchedule> {
    const lectureScheduleResponse = await this.lectureScheduleRepository.getById(
      id,
    );
    const lectureSchedule = lectureScheduleResponse[0];
    const lectureDetailsPromises = [];

    for (const lecture of lectureSchedule.lectures) {
      if (typeof lecture == 'number') {
        lectureDetailsPromises.push(this.lectureRepository.getById(lecture));
      }
    }

    const lectureDetailsResponses = await Promise.all(lectureDetailsPromises);

    const lectureDetails: Lecture[] = lectureDetailsResponses.reduce(
      (previousValue, currentValue) => [...previousValue, currentValue[0]],
    );

    const courseDetailsPromises = [];

    for (const lectureDetail of lectureDetails) {
      const promise = new Promise(async (resolve) => {
        const courseDetails = await this.courseRepository.getById(
          lectureDetail.courseId,
        );
        lectureDetail.courseId = courseDetails[0];
        resolve(lectureDetail);
      });
      courseDetailsPromises.push(promise);
    }

    const courseDetailsResponse = await Promise.all(courseDetailsPromises);

    lectureSchedule.lectures = courseDetailsResponse;
    return lectureSchedule;
  }

  async getByFacultyId(facultyId: number) {
    const response = await this.lectureScheduleRepository.getByFacultyId(
      facultyId,
    );
    return response[0];
  }
}
