import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Exam } from './entities/exam.entity';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, Task])],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
