import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from 'src/exam/entities/exam.entity';
import { Student } from 'src/student/entities/student.entity';
import { Submission } from 'src/submission/entities/submission.entity';
import { SubmissionTask } from 'src/submission/entities/submission.task.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'ncpptAdmin',
          password: 'myselfpreorderblinkedalmanacchubby',
          database: 'necpptunedb',
          entities: [Submission, Exam, Task, Student, SubmissionTask],
          synchronize: true,
        }
      }
    })
  ]
})
export class DatabaseModule { }