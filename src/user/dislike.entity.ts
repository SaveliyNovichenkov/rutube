import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { VideoEntity } from '../video/video.entity';
import { Base } from '../utils/base';
import { UserEntity } from './user.entity';

@Entity('Dislikes')
export class DislikeEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.dislikesFromUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'from_user_id' })
  fromUser: UserEntity;

  @ManyToOne(() => VideoEntity, (video) => video.dislike, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'to_video_id' })
  toVideo: VideoEntity;
}
