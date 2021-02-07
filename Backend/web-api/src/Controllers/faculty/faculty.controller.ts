import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import { FacultyService } from '../../Services/faculty/faculty.service';
import { Faculty } from '../../../../Persistance/Models/faculty';
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<Faculty[]> {
    return await this.facultyService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id') id) {
    return await this.facultyService.getById(parseInt(id));
  }
}
