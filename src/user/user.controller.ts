import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAll();
  }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id);
  }

  @Get('by-id/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.byId(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateProfile(+id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  async subscribeToChannel(
    @CurrentUser('id') id: number,
    @Param('channelId') channelId: string,
  ) {
    return this.userService.subscribe(id, +channelId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('like/:videoId')
  @Auth()
  async likeToVideo(
    @CurrentUser('id') id: number,
    @Param('videoId') videoId: string,
  ) {
    return this.userService.likeToVideo(id, +videoId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('dislike/:videoId')
  @Auth()
  async dislikeToVideo(
    @CurrentUser('id') id: number,
    @Param('videoId') videoId: string,
  ) {
    return this.userService.dislikeToVideo(id, +videoId);
  }

  @Get('subscriptions')
  async subscriptions() {
    return this.userService.subscriptions();
  }
}
