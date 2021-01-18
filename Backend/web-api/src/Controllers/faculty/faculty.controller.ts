import { Controller, Get, Param, Query } from '@nestjs/common';
import { FacultyService } from '../../Services/faculty/faculty.service';
import { Faculty } from '../../../../Persistance/Models/faculty';

@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) {}

  @Get()
  async getAll(): Promise<Faculty[]> {
    return await this.facultyService.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id) {
    return await this.facultyService.getById(parseInt(id));
  }
}
