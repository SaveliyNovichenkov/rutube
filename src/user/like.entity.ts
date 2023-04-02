import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { VideoEntity } from '../video/video.entity';
import { Base } from '../utils/base';
import { UserEntity } from './user.entity';

@Entity('Likes')
export class LikeEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.likesFromUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'from_user_id' })
  fromUser: UserEntity;

  @ManyToOne(() => VideoEntity, (video) => video.like, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'to_video_id' })
  toVideo: VideoEntity;
}
