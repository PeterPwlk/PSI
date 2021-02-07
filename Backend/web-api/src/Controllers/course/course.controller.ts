import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import { CourseService } from '../../Services/course/course.service';
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAll() {
    return await this.courseService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id') id) {
    return await this.courseService.getById(parseInt(id));
  }
}
