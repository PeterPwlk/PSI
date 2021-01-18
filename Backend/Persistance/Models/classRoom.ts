import {ClassRoomType} from "./classRoomType";

export interface ClassRoom {
    classRoomId: number;
    building: string;
    number: string;
    capacity: number;
    classRoomType: ClassRoomType;
}