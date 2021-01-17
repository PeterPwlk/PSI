import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from '../../Services/course/course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  public async getAll() {
    return await this.courseService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id') id) {
    return await this.courseService.getById(parseInt(id));
  }
}
