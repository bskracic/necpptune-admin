import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService
    ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('zip'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: CreateSubmissionDto) {
    // TODO: validate body
    return await this.submissionService.create(file, body);
  }

  @Get(':id/check')
  async check(@Param('id') id: string) {
    return await this.submissionService.checkIfAllGraded(id);
  }

  @Get()
  findAll() {
    return this.submissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.submissionService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionService.remove(+id);
  }
}
