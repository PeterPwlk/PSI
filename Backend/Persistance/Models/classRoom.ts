import {ClassRoomType} from "./classRoomType";

export interface ClassRoom {
    building: string;
    number: string;
    capacity: number;
    classRoomType: ClassRoomType;
}