import { Column, Entity, OneToMany } from 'typeorm';
import { VideoEntity } from '../video/video.entity';
import { Base } from '../utils/base';
import { SubscriptionEntity } from './subscription.entity';
import { LikeEntity } from './like.entity';
import { DislikeEntity } from './dislike.entity';

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: false, name: 'is_verified' })
  isVerified: boolean;

  @Column({ default: 0, name: 'subscribers_count' })
  subscribersCount?: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @OneToMany(() => LikeEntity, (like) => like.fromUser)
  likesFromUser: LikeEntity[];

  @OneToMany(() => VideoEntity, (video) => video.like)
  likesToVideo: VideoEntity[];

  @OneToMany(() => DislikeEntity, (dislike) => dislike.fromUser)
  dislikesFromUser: LikeEntity[];

  @OneToMany(() => VideoEntity, (video) => video.dislike)
  dislikesToVideo: VideoEntity[];

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];

  @OneToMany(() => SubscriptionEntity, (sub) => sub.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, (sub) => sub.toChannel)
  subscribers: SubscriptionEntity[];
}
