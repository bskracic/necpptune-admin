import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamModule } from './exam/exam.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './task/task.module';
import { StudentModule } from './student/student.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [
    DatabaseModule,
    ExamModule,
    TaskModule,
    StudentModule,
    SubmissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}


