import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  parentId: number;

  @IsNotEmpty()
  @IsNumber()
  videoId: number;
}
