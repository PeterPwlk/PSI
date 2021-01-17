import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClassRoomService } from '../../Services/class-room/class-room.service';

@Controller('class-room')
export class ClassRoomController {
  constructor(private readonly classRoomService: ClassRoomService) {}

  @Get()
  public async getAll() {
    return await this.classRoomService.getAll();
  }

  @Get('filter')
  public async getByClassRoomType(@Query('classRoomType') classRoomType) {
    return await this.classRoomService.getByClassRoomType(
      parseInt(classRoomType),
    );
  }

  @Get(':id')
  public async getById(@Param('id') id) {
    return await this.classRoomService.getById(parseInt(id));
  }

  // TODO filter classrooms by classroom type
}
