import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { Student } from 'src/student/entities/student.entity';
import { Task } from 'src/task/entities/task.entity';
import { Submission } from './entities/submission.entity';
import { SubmissionTask } from './entities/submission.task.entity';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { SubmissionTaskController } from './submission.task.controller';
import { SubmissionTaskService } from './submission.task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, SubmissionTask, Student, Task]), MinioClientModule],
  controllers: [SubmissionController, SubmissionTaskController],
  providers: [SubmissionService, SubmissionTaskService]
})
export class SubmissionModule {}
