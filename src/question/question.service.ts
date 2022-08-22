import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(title: string, description: string, authorId: number) {
    return await this.prisma.question.create({
      data: {
        title: title,
        description: description,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.question.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.question.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.question.delete({
      where: {
        id: id,
      },
    });
  }
}
