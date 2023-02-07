import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { UpdateSubmissionTaskDto } from "./dto/update-submission-task-dto";
import { SubmissionTaskService } from "./submission.task.service";

@Controller('submission/task')
export class SubmissionTaskController {
  constructor(
    private readonly submissionTaskService: SubmissionTaskService
    ) {}


  @Get(':id')
  async findSubmissionTask(@Param('id') id: string) {
    return this.submissionTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubmissionTaskDto) {
    return this.submissionTaskService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}