import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamService {

  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(Task)
    private taskRepository: Repository<Exam>
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return this.examRepository.save(createExamDto)
  }

  findAll() {
    return this.examRepository.find();
  }

  findOne(id: number) {
    return this.examRepository.findBy({id: id});
  }

  async findAllGroups(id: number): Promise<string[]> {
    const rows = await this.taskRepository.createQueryBuilder('task')
    .select('exam_group')
    .where(`exam_id = ${id}`)
    .distinct(true).getRawMany();

    return rows.map(r => r.exam_group);
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
