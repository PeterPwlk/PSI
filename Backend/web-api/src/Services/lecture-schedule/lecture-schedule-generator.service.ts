import { Injectable } from '@nestjs/common';
import { LectureSchedule } from '../../../../Persistance/Models/lectureSchedule';
import { StudentsGroup } from '../../../../Persistance/Models/studentsGroup';
import { Faculty } from '../../../../Persistance/Models/faculty';
import { LectureForm } from '../../../../Persistance/Models/lectureForm';
import { Lecture } from '../../../../Persistance/Models/lecture';

@Injectable()
export class LectureScheduleGeneratorService {
  public generate(
    studentsGroup: StudentsGroup,
    faculty: Faculty,
  ): LectureSchedule {
    const lectureSchedule: LectureSchedule = {
      lectureScheduleId: Math.floor(Math.random() * 100),
      lectures: [],
      faculty: faculty,
      createdTime: new Date(),
      studentGroup: studentsGroup,
    };

    const lectureForms = studentsGroup.courses
      .reduce((agr, c) => [...agr, ...c.lectureForms], [])
      .map((l) =>
        this.generateLecturesForLectureForm(
          l,
          studentsGroup.numberOfStudents,
          lectureSchedule.lectureScheduleId,
        ),
      );

    const mergedLectureForms = [].concat(...lectureForms);

    lectureSchedule.lectures = mergedLectureForms;

    return lectureSchedule;
  }

  public generateLecturesForLectureForm(
    lectureForm: LectureForm,
    numberOfStudents: number,
    lectureScheduleId: number,
  ): Lecture[] {
    const numberOfGroups = Math.ceil(
      numberOfStudents / lectureForm.numberOfStudentsInGroup,
    );

    const lectures: Lecture[] = [];
    for (let i = 1; i <= numberOfGroups; i++) {
      lectures.push({
        lectureId: Math.floor(Math.random() * 1100),
        course: lectureForm,
        courseId: lectureForm.courseId,
        conductedClasses: [],
        lectureTime: [],
        groupNumber: `${LectureScheduleGeneratorService.generateRandomGroupNumber(3)}-${LectureScheduleGeneratorService.generateRandomGroupNumber(3)}`,
        lectureScheduleId: lectureScheduleId,
      });
    }
    return lectures;
  }

  private static generateRandomGroupNumber(n: number): string {
    return (Math.random().toString(36) + '00000000000000000').slice(2, n + 2);
  }
}
