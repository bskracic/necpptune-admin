import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamService {

  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return this.examRepository.save(createExamDto)
  }

  findAll() {
    return this.examRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
