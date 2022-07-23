import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { Base } from "../utils/base";
import { CommentEntity } from "../comment/comment.entity";


@Entity('Video')
export class VideoEntity extends Base {
  @Column()
  name: string

  @Column({default:false, name: "is_public"})
  isPublic: string

  @Column({default: 0})
  views?: string

  @Column({default: 0})
  likes?: string

  @Column({default: 0})
  duration?: string

  @Column({default: "", type: "text"})
  description: string

  @Column({default: "", name: "video_path"})
  videoPath: string

  @Column({default: "", name: "thumbnail_path"})
  thumbnailPath: string

  @ManyToOne(() => UserEntity, user => user.videos)
  @JoinColumn({ name: "user_id" })
  user: UserEntity


  @OneToMany(() => CommentEntity, comment => comment.video)
  @JoinColumn({ name: "user_id" })
  comment: CommentEntity

}