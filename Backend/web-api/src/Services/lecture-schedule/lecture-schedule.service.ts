import {Injectable} from '@nestjs/common';
import {LectureSchedule} from '../../../../Persistance/Models/lectureSchedule';
import {LectureScheduleRepositoryService} from './lecture-schedule-repository.service';
import {CourseRepositoryService} from '../course/course-repository.service';
import {FacultyRepositoryService} from '../faculty/faculty-repository.service';
import {LectureRepositoryService} from '../lecture/lecture-repository.service';
import {LectureService} from '../lecture/lecture.service';

@Injectable()
export class LectureScheduleService {
  constructor(
    private lectureScheduleRepository: LectureScheduleRepositoryService,
    private facultyRepository: FacultyRepositoryService,
    private lectureRepository: LectureRepositoryService,
    private courseRepository: CourseRepositoryService,
    private lectureService: LectureService,
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
}
