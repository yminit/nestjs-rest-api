import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { vi } from "vitest";

import { PrismaService } from "../prisma/prisma.service.js";
import { PostsService } from "./posts.service.js";
import { mockPost, mockPosts } from "./__mocks__/posts.mock.js";

describe("PostsService", () => {
  let service: PostsService;

  const mockPrisma = {
    post: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get(PostsService);
  });

  it("전체 조회", async () => {
    mockPrisma.post.findMany.mockResolvedValue(mockPosts);

    const result = await service.findAll();

    expect(result).toEqual(mockPosts);
    expect(mockPrisma.post.findMany).toHaveBeenCalledOnce();
  });

  it("상세 조회", async () => {
    mockPrisma.post.findUnique.mockResolvedValue(mockPost);

    const result = await service.findOne(mockPost.id);

    expect(result).toEqual(mockPost);
    expect(mockPrisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: mockPost.id },
    });
  });

  it("게시글 등록", async () => {
    const dto = {
      title: "테스트 게시글",
      content: "테스트 내용",
    };

    mockPrisma.post.create.mockResolvedValue(mockPost);

    const result = await service.create(dto);

    expect(result).toEqual(mockPost);
    expect(mockPrisma.post.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it("게시글 수정", async () => {
    const dto = { title: "수정된 제목" };
    const updated = { ...mockPost, ...dto };

    mockPrisma.post.findUnique.mockResolvedValue(mockPost);
    mockPrisma.post.update.mockResolvedValue(updated);

    const result = await service.update(mockPost.id, dto);

    expect(result).toEqual(updated);
    expect(mockPrisma.post.update).toHaveBeenCalledWith({
      where: { id: mockPost.id },
      data: { title: "수정된 제목" },
    });
  });

  it("게시글 삭제", async () => {
    mockPrisma.post.findUnique.mockResolvedValue(mockPost);
    mockPrisma.post.delete.mockResolvedValue(mockPost);

    const result = await service.remove(mockPost.id);

    expect(result).toEqual(mockPost);
    expect(mockPrisma.post.delete).toHaveBeenCalledWith({
      where: { id: mockPost.id },
    });
  });

  it("존재하지 않는 게시글 조회", async () => {
    mockPrisma.post.findUnique.mockResolvedValue(null);

    await expect(service.findOne(mockPost.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("존재하지 않는 게시글 수정", async () => {
    mockPrisma.post.findUnique.mockResolvedValue(null);

    await expect(
      service.update(mockPost.id, { title: "수정" }),
    ).rejects.toThrow(NotFoundException);

    expect(mockPrisma.post.update).not.toHaveBeenCalled();
  });

  it("존재하지 않는 게시글 삭제", async () => {
    mockPrisma.post.findUnique.mockResolvedValue(null);

    await expect(service.remove(mockPost.id)).rejects.toThrow(
      NotFoundException,
    );

    expect(mockPrisma.post.delete).not.toHaveBeenCalled();
  });
});
