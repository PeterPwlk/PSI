import {Body, Controller, Get, Param, Patch, UseGuards} from '@nestjs/common';
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
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('lecture')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<LectureDTO[]> {
    const lectures = await this.lectureService.getAll();
    return mapToLectureDTO(lectures);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id') id): Promise<LectureDTO> {
    const lecture = await this.lectureService.getById(parseInt(id));
    const response = mapToLectureDTO([lecture]);
    return response[0];
  }

  @Patch('/edit/lectureTime/:lectureId')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
