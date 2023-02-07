import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/exam/entities/exam.entity';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { Student } from 'src/student/entities/student.entity';
import { FileCppWalkIterator, StudentFileData } from 'src/utils/iterator';
import { DefaultUnzipStrategy } from 'src/utils/unzip';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionTask } from './entities/submission.task.entity';
const path = require('path');
const fs = require('fs');

@Injectable()
export class SubmissionService {

  SUBMISSION_DIR_PATH: string = "C:\\temp\\submissions-data\\"; // TODO replace this

  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    @InjectRepository(SubmissionTask)
    private submisstionTaskRepo: Repository<SubmissionTask>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    private minioClientService: MinioClientService
  ) { }

  async create(file: Express.Multer.File, data: CreateSubmissionDto) {
    
    let submission = this.fromDto(data);
    submission.zipFile = file.originalname;
    submission.exam =  await this.examRepository.findOneBy({id: data.examId});
    submission = await this.submissionRepository.save(submission);

    const unzipPath = `${this.SUBMISSION_DIR_PATH}${submission.id}`;
    const strat = new DefaultUnzipStrategy();
    await strat.unzip(file.buffer, unzipPath);
    
    const taskSubmissions = []
    let it = new FileCppWalkIterator(unzipPath);
    while(it.hasNext()) {
      const studentData: StudentFileData = it.next();
      const slug = studentData.identifier.replace("@racunarstvo.hr", "");
      
      const student = await this.studentRepository.findOneBy({infoedukaSlug: slug});

      for(let i = 0; i < studentData.files.length; i++) {
          const filePath = studentData.files[i];
          
          const taskSubmission = new SubmissionTask();
          const temp = filePath.split(path.sep)
          const uploadedFile = await this.minioClientService.uploadSync(fs.readFileSync(filePath))
          taskSubmission.fileDetails = path.join(temp[temp.length - 2], temp[temp.length - 1]);
          taskSubmission.student = student;
          taskSubmission.fileLink = uploadedFile.url;
          taskSubmission.submission = submission;
  
          this.submisstionTaskRepo.save(taskSubmission);
          taskSubmissions.push(taskSubmission);
      }
    }

    
    return submission;
  }

  private fromDto(dto: CreateSubmissionDto): Submission {
    let submission = new Submission();
    submission.createdAt = new Date();
    submission.createdBy = dto.createdBy;
    submission.term = dto.term;
    submission.name = dto.name;
    return submission;
  }

  findAll() {
    return this.submissionRepository.find();
  }

  async findOne(id: string) {
    const submission = await this.submissionRepository.findOneBy({id: id});
    const submissionTasks = await this.submisstionTaskRepo
    // .findBy({submission: submission});
      .createQueryBuilder('submission_task')
      .leftJoin('student', 's', 'submission_task.student_id = s.id').getMany();
    
    submission.submissionTasks = submissionTasks;
    return submission;
  }

  async checkIfAllGraded(id: string) {
    const submission = await this.submissionRepository.findOneBy({id: id});
    return await this.submisstionTaskRepo.findBy({submission: submission, scorredPoints: null});
  }

  update(id: number) {

  } 

  remove(id: number) {
    return `This action removes a #${id} submission`;
  }

}
