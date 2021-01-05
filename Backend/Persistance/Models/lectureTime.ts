import {WeekDay} from "./weekDay";
import {WeekType} from "./weekType";
import {ClassRoom} from "./classRoom";

export interface LectureTime {
    startTime: Date;
    endTime: Date;
    day: WeekDay;
    weekType: WeekType;
    classRoom: ClassRoom;
}