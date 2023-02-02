import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { Student } from 'src/student/entities/student.entity';
import { FileCppWalkIterator, StudentFileData } from 'src/utils/iterator';
import { DefaultUnzipStrategy } from 'src/utils/unzip';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionTask } from './entities/submission.task.entity';

@Injectable()
export class SubmissionService {

  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    @InjectRepository(SubmissionTask)
    private submisstionTaskRepo: Repository<SubmissionTask>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private minioClientService: MinioClientService
  ) { }

  async create(file: Express.Multer.File, data: CreateSubmissionDto) {
    
    let submission = this.fromDto(data);
    submission.zipFile = file.originalname;
    submission = await this.submissionRepository.save(submission);

    const path = `C:\\temp\\submissions-data\\${submission.id}`;
    const strat = new DefaultUnzipStrategy();
    await strat.unzip(file.buffer, path);

    const test: StudentFileData[] = [];
    let it = new FileCppWalkIterator(path);
    while(it.hasNext()) {
      const val: StudentFileData = it.next();
      test.push(val);
    }

    return test;

    // walk submission dir and for each
    //    save to minio
    //    create and save submission_task record
    // return list of submissions
  }

  private fromDto(dto: CreateSubmissionDto): Submission {
    let submission = new Submission();
    submission.createdAt = new Date();
    submission.createdBy = dto.createdBy;
    submission.term = dto.term;
    submission.name = dto.name;
    return submission;
  }

  async testMinio(file) {
    let uploaded_file = await this.minioClientService.upload(file)

    return uploaded_file.url;
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
