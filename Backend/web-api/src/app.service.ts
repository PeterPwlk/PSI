import { Injectable } from '@nestjs/common';
import { Test } from '../../Persistance/Models'

@Injectable()
export class AppService {
  getHello(): Test {
    return {text: "'Hello World!'"};
  }
}
