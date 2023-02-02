import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from 'src/exam/entities/exam.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Task, Exam])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
