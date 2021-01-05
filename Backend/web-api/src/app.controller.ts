import { Controller, Get } from '@nestjs/common';
import { Test } from '../../Persistance/Models';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Test {
    return this.appService.getHello();
  }
}
