import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioClientService } from 'src/minio-client/minio-client.service';

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

  @Post("file")
  @UseInterceptors(FileInterceptor("file"))
  async test(@UploadedFile() file: Express.Multer.File) {
    return this.submissionService.testMinio(file);
  }


  @Get()
  findAll() {
    return this.submissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionService.update(+id, updateSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionService.remove(+id);
  }
}
