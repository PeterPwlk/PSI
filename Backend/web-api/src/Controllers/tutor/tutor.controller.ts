import { Controller, Get, Param, Query } from '@nestjs/common';
import { TutorService } from '../../Services/tutor/tutor.service';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Get()
  public async getAll() {
    return await this.tutorService.getAll();
  }

  @Get('filter')
  public async getByCourseId(@Query('courseId') courseId) {
    return await this.tutorService.getAllBySuggestedCourseId(
      parseInt(courseId),
    );
  }

  @Get(':id')
  public async getById(@Param('id') id) {
    return await this.tutorService.getById(parseInt(id));
  }
}
