import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { SubscriptionEntity } from './subscription.entity';
import { LikeEntity } from './like.entity';
import { DislikeEntity } from './dislike.entity';
import { VideoEntity } from 'src/video/video.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      VideoEntity,
      SubscriptionEntity,
      LikeEntity,
      DislikeEntity,
    ]),
  ],
})
export class UserModule {}
