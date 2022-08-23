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
        answers: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
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
        answers: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  async findManyByTitle(title: string) {
    const data = await this.prisma.question.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        answers: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
    return data;
  }

  async findManyByUsername(username: string) {
    const data = await this.prisma.question.findMany({
      where: {
        author: {
          username: username,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        answers: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
    return data;
  }

  async remove(id: number) {
    await this.prisma.answer.deleteMany({
      where: {
        questionId: id,
      },
    });
    await this.prisma.question.delete({
      where: {
        id: id,
      },
    });
    return 'Answer deleted successfully👽👍🏿';
  }
}
