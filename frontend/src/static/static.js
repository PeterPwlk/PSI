export function mapLectureTypeToClassRoomType(lectureType) {
    switch (lectureType) {
        case 0:
            return 1;
        case 1:
            return 0;
        case 2:
            return 0;
        case 3:
            return 3;
        default:
            return null
    }
}
