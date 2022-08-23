import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async create(response: string, authorId: number, questionId: number) {
    return await this.prisma.answer.create({
      data: {
        response: response,
        authorId: authorId,
        questionId: questionId,
      },
    });
  }

  async findAllByAuthorId(authorId: number) {
    return await this.prisma.answer.findMany({
      where: {
        authorId: authorId,
      },
    });
  }

  async remove(authorId: number, answerId: number, questionId: number) {
    const answer = await this.prisma.answer.findFirstOrThrow({
      where: {
        id: answerId,
        questionId: questionId,
      },
      include: {
        author: true,
        question: {
          include: {
            author: true,
          },
        },
      },
    });

    if (
      authorId === answer.author.id ||
      answerId === answer.question.author.id
    ) {
      await this.prisma.answer.delete({
        where: {
          id: answer.id,
        },
      });
      return 'Answer deleted successfully👽👍🏿';
    }
    throw new UnauthorizedException();
  }
}
