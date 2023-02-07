import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MinioClientService } from "src/minio-client/minio-client.service";
import { Task } from "src/task/entities/task.entity";
import { Repository } from "typeorm";
import { UpdateSubmissionTaskDto } from "./dto/update-submission-task-dto";
import { SubmissionTask } from "./entities/submission.task.entity";

@Injectable()
export class SubmissionTaskService {

    constructor(
        @InjectRepository(SubmissionTask)
        private submisstionTaskRepo: Repository<SubmissionTask>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private minioClientService: MinioClientService
      ) { }

      async findOne(id: number) {
        return this.submisstionTaskRepo.findOneBy({id: id})
      }
    
      async update(id: number, dto: UpdateSubmissionTaskDto) {
          const ts = await this.submisstionTaskRepo.findOneBy({id: id});
          ts.task = await this.taskRepository.findOneBy({id: dto.taskId});
          ts.note = dto.note;
          ts.scorredPoints = dto.scorredPoints;
    
          await this.submisstionTaskRepo.save(ts);
      }

     
}