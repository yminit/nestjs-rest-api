import { Injectable, NotFoundException } from "@nestjs/common";
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
    await this.findOne(id);

    const { title, content } = updatePostDto;

    return this.prisma.post.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
      },
    });
  }

  async remove(id: string): Promise<Post> {
    await this.findOne(id);

    return this.prisma.post.delete({
      where: { id },
    });
  }
}
