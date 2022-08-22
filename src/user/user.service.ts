import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // async create(username: string, password: string) {
  //   // await this.prisma.user.
  //   return 'created user';
  // }

  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    return allUsers;
  }

  async findOne(username: string) {
    return await this.prisma.user.findFirst({
      where: { username: username },
    });
  }
  // async findOne(id: string) {
  //   return;
  // }

  // async destroy() {
  //   return 'destroy a user';
  // }
}
