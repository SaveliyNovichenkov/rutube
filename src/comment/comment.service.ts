import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(userId: number, dto: CommentDto) {
    const newComment = this.commentRepository.create({
      message: dto.message,
      video: { id: dto.videoId },
      user: { id: userId },
      parent: { id: dto.parentId },
    });
    return this.commentRepository.save(newComment);
  }

  async byIdComment(id: number) {
    const comment = this.commentRepository.findOne({
      relations: {
        user: true,
        video: true,
        children: true,
      },
      where: {
        id,
      },
    });
    if (!comment) throw new NotFoundException('Комментарий не найден!');
    return comment;
  }

  async updateComment(id: number, dto: CommentDto) {
    const comment = await this.byIdComment(id);
    comment.message = dto.message;
    return this.commentRepository.save(comment);
  }

  async deleteComment(id: number) {
    return this.commentRepository.delete({ id });
  }
}
