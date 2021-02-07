import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { LectureService } from '../../Services/lecture/lecture.service';
import { LectureTimePatchDTO } from '../../DTO/lectureTimePatchDTO';
import { LectureTutorPatchDTO } from '../../DTO/lectureTutorPatchDTO';
import {
  ConductedClassesDTO,
  LectureDTO,
  LectureTimeDTO,
  mapToConductedClassesDTO,
  mapToLectureDTO,
  mapToLectureTimeDTO,
} from '../../DTO/lectureDTO';

@Controller('lecture')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Get()
  async getAll(): Promise<LectureDTO[]> {
    const lectures = await this.lectureService.getAll();
    return mapToLectureDTO(lectures);
  }

  @Get(':id')
  public async getById(@Param('id') id): Promise<LectureDTO> {
    const lecture = await this.lectureService.getById(parseInt(id));
    const response = mapToLectureDTO([lecture]);
    return response[0];
  }

  @Patch('/edit/lectureTime/:lectureId')
  public async updateLectureTime(
    @Body() lectureTime: LectureTimePatchDTO,
    @Param('lectureId') lectureId: string,
  ): Promise<LectureTimeDTO[]> {
    const update = await this.lectureService.updateLectureTime(
      parseInt(lectureId),
      lectureTime,
    );
    return mapToLectureTimeDTO(update);
  }

  @Patch('/edit/tutor/:lectureId')
  public async updateLectureTutor(
    @Body() conductedClasses: LectureTutorPatchDTO,
    @Param('lectureId') lectureId: string,
  ): Promise<ConductedClassesDTO[]> {
    const update = await this.lectureService.updateLectureTutor(
      parseInt(lectureId),
      conductedClasses,
    );
    return mapToConductedClassesDTO(update);
  }

  @Patch('/delete/tutor/:lectureId')
  public async deleteLectureTutor(
    @Body() conductedClasses: LectureTutorPatchDTO,
    @Param('lectureId') lectureId: string,
  ): Promise<ConductedClassesDTO[]> {
    const update = await this.lectureService.deleteLectureTutor(
      parseInt(lectureId),
      conductedClasses,
    );
    return mapToConductedClassesDTO(update);
  }

  @Patch('/delete/lectureTime/:lectureId')
  public async deleteLectureTime(
      @Body() lectureTime: LectureTimePatchDTO,
      @Param('lectureId') lectureId: string,
  ): Promise<LectureTimeDTO[]> {
    const update = await this.lectureService.deleteLectureTime(
        parseInt(lectureId),
        lectureTime,
    );
    return mapToLectureTimeDTO(update);
  }
}
