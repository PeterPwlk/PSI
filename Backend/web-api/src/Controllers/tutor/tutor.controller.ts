import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import { TutorService } from '../../Services/tutor/tutor.service';
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAll() {
    return await this.tutorService.getAll();
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  public async getByCourseId(@Query('courseId') courseId) {
    return await this.tutorService.getAllBySuggestedCourseId(
      parseInt(courseId),
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id') id) {
    return await this.tutorService.getById(parseInt(id));
  }
}
