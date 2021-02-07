import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import { ClassRoomService } from '../../Services/class-room/class-room.service';
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('class-room')
export class ClassRoomController {
  constructor(private readonly classRoomService: ClassRoomService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAll() {
    return await this.classRoomService.getAll();
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  public async getByClassRoomType(@Query('classRoomType') classRoomType) {
    return await this.classRoomService.getByClassRoomType(
      parseInt(classRoomType),
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id') id) {
    return await this.classRoomService.getById(parseInt(id));
  }

  // TODO filter classrooms by classroom type
}
