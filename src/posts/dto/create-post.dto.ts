import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ example: "새 게시글" })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: "게시글 내용입니다." })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
