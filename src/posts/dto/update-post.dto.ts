import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePostDto {
  @ApiPropertyOptional({ example: "수정된 게시글" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  declare title?: string;

  @ApiPropertyOptional({ example: "수정된 내용입니다." })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  declare content?: string;
}
