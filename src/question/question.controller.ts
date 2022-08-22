import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { title } from 'process';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createQuestionDto: CreateQuestionDto) {
    const data = await this.questionService.create(
      createQuestionDto.title,
      createQuestionDto.description,
      req.user.id,
    );
    return await {
      id: data.id,
    };
  }

  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Get('title/:title')
  async findManyByTitle(@Param('title') title: string) {
    return this.questionService.findManyByTitle(title);
  }

  @Get('user/:username')
  async findManyByUsername(@Param('username') username: string) {
    return this.questionService.findManyByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const question = await this.questionService.findOne(+id);
    if (req.user.id == question.author.id)
      return await this.questionService.remove(+id);
    throw new UnauthorizedException();
  }
}
