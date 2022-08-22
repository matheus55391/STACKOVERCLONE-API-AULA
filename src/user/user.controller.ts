import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/PublicDecorator.decorator';
import { CraeteUserDto } from './dto/create-user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() data: CraeteUserDto) {
    if (
      data.username &&
      data.username.length >= 6 &&
      data.password &&
      data.password.length >= 6
    ) {
      const user = await this.userService.validateNewUser(data.username);
      if (!user) {
        await this.userService.create(data);
        return;
      }
    }
    throw new BadRequestException();
  }
}
