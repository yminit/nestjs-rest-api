import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

import type { Post } from "./interfaces/post.interface.js";
import type { CreatePostDto } from "./dto/create-post.dto.js";
import type { UpdatePostDto } from "./dto/update-post.dto.js";

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException("게시글을 찾을 수 없습니다.");
    }

    return post;
  }

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    if (post.isSeed) {
      throw new ForbiddenException("기본 게시글은 수정할 수 없습니다.");
    }

    const { title, content } = updatePostDto;

    return this.prisma.post.update({
      where: { id, isSeed: false },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
      },
    });
  }

  async remove(id: string): Promise<Post> {
    const post = await this.findOne(id);

    if (post.isSeed) {
      throw new ForbiddenException("기본 게시글은 삭제 할 수 없습니다.");
    }

    return this.prisma.post.delete({
      where: { id, isSeed: false },
    });
  }
}
