import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    AuthModule,
    LectureScheduleModule,
    ClassRoomModule,
    TutorModule,
    CourseModule,
    FacultyModule,
    LectureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
