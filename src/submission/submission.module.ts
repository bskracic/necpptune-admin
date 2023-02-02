import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { SubmissionTask } from './entities/submission.task.entity';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { Student } from 'src/student/entities/student.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, SubmissionTask, Student, Task]), MinioClientModule],
  controllers: [SubmissionController],
  providers: [SubmissionService]
})
export class SubmissionModule {}
