import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CraeteUserDto } from './dto/create-user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validateNewUser(username: string) {
    return await this.prisma.user.findFirst({
      where: { username: username },
    });
  }

  async create(user: CraeteUserDto) {
    return await this.prisma.user.create({
      data: user,
    });
  }

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
