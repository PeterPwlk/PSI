import { Controller, Get, Param } from '@nestjs/common';
import { LectureService } from '../../Services/lecture/lecture.service';
import { Lecture } from '../../../../Persistance/Models/lecture';

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
}
