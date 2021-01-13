import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LectureScheduleModule } from './Services/lecture-schedule/lecture-schedule.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LectureScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
