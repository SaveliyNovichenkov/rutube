import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../utils/base';
import { UserEntity } from '../user/user.entity';
import { VideoEntity } from '../video/video.entity';

@Entity('Comment')
export class CommentEntity extends Base {
  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children?: CommentEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, (video) => video.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'video_id' })
  video: UserEntity;
}
