import {WeekDay} from "./weekDay";
import {WeekType} from "./weekType";

export interface TutorAvailability {
    weekDay: WeekDay;
    startTime: Date;
    endTime: Date;
    week: WeekType;
}