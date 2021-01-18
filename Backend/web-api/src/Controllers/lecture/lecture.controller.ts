import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { LectureService } from '../../Services/lecture/lecture.service';
import { Lecture } from '../../../../Persistance/Models/lecture';
import { LectureTime } from '../../../../Persistance/Models/lectureTime';
import { ConductedClasses } from '../../../../Persistance/Models/conductedClasses';

@Controller('lecture')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Get()
  async getAll(): Promise<Lecture[]> {
    return await this.lectureService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id) {
    return await this.lectureService.getById(parseInt(id));
  }

  @Patch('/edit/lectureTime/:lectureId')
  public async updateLectureTime(
    @Body() lectureTime: LectureTime,
    @Param('lectureId') lectureId: string,
  ): Promise<Lecture> {
    return await this.lectureService.updateLectureTime(
      parseInt(lectureId),
      lectureTime,
    );
  }
  @Patch('/edit/tutor/:lectureId')
  public async updateLectureTutor(
    @Body() conductedClasses: ConductedClasses,
    @Param('lectureId') lectureId: string,
  ): Promise<Lecture> {
    return await this.lectureService.updateLectureTutor(
      parseInt(lectureId),
      conductedClasses,
    );
  }
}
