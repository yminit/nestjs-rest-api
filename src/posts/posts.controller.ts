import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post as PostMethod,
} from "@nestjs/common";
import { PostsService } from "./posts.service.js";
import { CreatePostDto } from "./dto/create-post.dto.js";
import { UpdatePostDto } from "./dto/update-post.dto.js";
import type { Post } from "./interfaces/post.interface.js";

@ApiTags("Posts")
@Controller("api/posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: "게시글 전체 조회" })
  @Get()
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: "게시글 상세 조회" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
  })
  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe()) id: string): Promise<Post> {
    return this.postService.findOne(id);
  }

  @ApiOperation({ summary: "게시글 등록" })
  @PostMethod()
  create(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: "게시글 수정" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
  })
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: "게시글 삭제" })
  @ApiParam({
    name: "id",
    type: String,
    format: "uuid",
  })
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<Post> {
    return this.postService.remove(id);
  }
}
