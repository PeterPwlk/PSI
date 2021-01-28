import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authenticateRequest: { name: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('logout')
  async logout(@Req() req: any, @Res({ passthrough: true }) res: any) {
    await this.authService.logout();
    const cookie = req.cookies['Authentication'];
    res.clearCookie('Authentication', cookie);
  }

  @Get('token')
  async getToken(
    @Res({ passthrough: true }) res: any,
    @Query('code') code: string,
  ) {
    const token = await this.authService.generateToken(code);
    res.cookie('Authentication', token);
  }
}
