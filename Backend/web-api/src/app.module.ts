import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LectureScheduleModule } from './Services/lecture-schedule/lecture-schedule.module';
import { ClassRoomModule } from './Services/class-room/class-room.module';
import { TutorModule } from './Services/tutor/tutor.module';
import { CourseModule } from './Services/course/course.module';
import { FacultyModule } from './Services/faculty/faculty.module';
import { LectureModule } from './Services/lecture/lecture.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LectureScheduleModule,
    ClassRoomModule,
    TutorModule,
    CourseModule,
    FacultyModule,
    LectureModule,
    CacheModule.register({
      ttl: 300,
      max: 5,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
