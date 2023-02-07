import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/exam/entities/exam.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const exam = await this.examRepository.findOneByOrFail({id: createTaskDto.examId});
    const task: Task = {id: 0, exam: exam, ...createTaskDto};
    return this.taskRepository.save(task);
  }

  async findAllForExam(examId: number, examGroup: string): Promise<Task[]> {
    if(examId === undefined) {
      return this.taskRepository.find();
    }

    const exam = await this.examRepository.findOneByOrFail({id: examId});
    return this.taskRepository.findBy({exam: exam, group: examGroup});
  }

  async findOne(id: number) {
    return this.taskRepository.findOneBy({id: id});
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
