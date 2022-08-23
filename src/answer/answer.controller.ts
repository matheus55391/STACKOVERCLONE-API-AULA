import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Question } from 'src/question/entities/question.entity';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createAnswerDto: CreateAnswerDto) {
    console.log(req.user);

    return this.answerService.create(
      createAnswerDto.response,
      req.user.id,
      createAnswerDto.questionId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('question/:questionid/answer/:answerid')
  async remove(
    @Req() req,
    @Param('answerid') answerId: string,
    @Param('questionid') questionId: string,
  ) {
    return this.answerService.remove(req.user.id, +answerId, +questionId);
  }
}
