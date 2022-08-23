import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/strategys/jwt.strategy';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, PrismaService, JwtStrategy],
})
export class AnswerModule {}
