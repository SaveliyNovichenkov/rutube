import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { UserDto } from './user.dto';
import { genSalt, hash } from 'bcryptjs';
import { VideoEntity } from 'src/video/video.entity';
import { DislikeEntity } from './dislike.entity';
import { LikeEntity } from './like.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    @InjectRepository(DislikeEntity)
    private readonly dislikeRepository: Repository<DislikeEntity>,
  ) {}

  async getAll() {
    return await this.userRepository.find({
      relations: {
        videos: true,
        subscriptions: {
          toChannel: true,
          fromUser: true,
        },
      },
    });
  }

  //by-id
  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        videos: true,
        subscriptions: {
          toChannel: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (!user) throw new NotFoundException('Пользователь не найден!');
    return user;
  }
  //

  //update
  async updateProfile(id: number, dto: UserDto) {
    const user = await this.byId(id);

    const isSameUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    /*    if(isSameUser && id === isSameUser.id) throw new BadRequestException(
      'Пользователь с таким email уже существует'
    )*/
    if (dto.password) {
      const salt = await genSalt(10);
      user.password = await hash(dto.password, salt);
    }

    user.email = dto.email;
    user.name = dto.name;
    user.description = dto.description;
    user.avatarPath = dto.avatarPath;
    user.isVerified = dto.isVerified;
    user.subscribersCount = dto.subscribersCount;

    return this.userRepository.save(user);
  }

  //subscribe
  async subscriptions() {
    return this.subscriptionRepository.find({});
  }
  async subscribe(id: number, channelId: number) {
    const data = {
      toChannel: { id: channelId },
      fromUser: { id },
    };
    const isSubscribed = await this.subscriptionRepository.findOneBy(data);
    const channel = await this.userRepository.findOne({
      where: {
        id: channelId,
      },
    });
    if (!isSubscribed) {
      const newSubscription = await this.subscriptionRepository.create(data);
      channel.subscribersCount++;
      await this.userRepository.save(channel);
      await this.subscriptionRepository.save(newSubscription);
      return true;
    }
    channel.subscribersCount--;
    await this.userRepository.save(channel);
    await this.subscriptionRepository.delete(data);
    return false;
  }

  async likeToVideo(id: number, videoId: number) {
    const data = {
      toVideo: { id: videoId },
      fromUser: { id },
    };
    const isLiked = await this.likeRepository.findOneBy(data);
    const video = await this.videoRepository.findOne({
      where: {
        id: videoId,
      },
    });
    if (!isLiked) {
      const newLike = await this.likeRepository.create(data);
      video.likes++;
      await this.videoRepository.save(video);
      await this.likeRepository.save(newLike);
      return true;
    }
    video.likes--;
    await this.videoRepository.save(video);
    await this.likeRepository.delete(data);
    return false;
  }

  async dislikeToVideo(id: number, videoId: number) {
    const data = {
      toVideo: { id: videoId },
      fromUser: { id },
    };
    const isDisliked = await this.dislikeRepository.findOneBy(data);
    const video = await this.videoRepository.findOne({
      where: {
        id: videoId,
      },
    });
    if (!isDisliked) {
      const newDislike = await this.dislikeRepository.create(data);
      video.dislikes++;
      await this.videoRepository.save(video);
      await this.dislikeRepository.save(newDislike);
      return true;
    }
    video.dislikes--;
    await this.videoRepository.save(video);
    await this.dislikeRepository.delete(data);
    return false;
  }
}
