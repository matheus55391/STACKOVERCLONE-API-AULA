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
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createQuestionDto: CreateQuestionDto) {
    console.log('Req:', req.user);
    console.log('Body:', createQuestionDto.title);
    await this.questionService.create(
      createQuestionDto.title,
      createQuestionDto.description,
      req.user.id,
    );
    return true;
  }

  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
