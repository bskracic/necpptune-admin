import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultUnzipStrategy } from 'src/utils/unzip';
import { Repository } from 'typeorm';
import { Readable } from 'typeorm/platform/PlatformTools';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';

@Injectable()
export class SubmissionService {

  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>
  ) { }

  async create(file: Express.Multer.File, data: CreateSubmissionDto) {
    let submission = new Submission();
    submission.zipFile = file.originalname;
    submission.createdAt = new Date();
    submission.createdBy = data.createdBy;
    submission.term = data.term;
    submission.name = data.name;
    
    submission = await this.submissionRepository.save(submission);

    const path = `./submissions-data/${submission.id}/`;
    await new DefaultUnzipStrategy().unzip(file.buffer, path);

  }

  findAll() {
    return `This action returns all submission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submission`;
  }

  update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    return `This action updates a #${id} submission`;
  }

  remove(id: number) {
    return `This action removes a #${id} submission`;
  }
}
