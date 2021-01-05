import { LectureSchedule } from "../Models/lectureSchedule";
import AWS from 'aws-sdk';

export interface ILectureSchedulesRepository {
    create(plan: LectureSchedule): void;
}

export class LectureSchedulesRepository implements ILectureSchedulesRepository {
    create(plan: LectureSchedule): void {
    }
}