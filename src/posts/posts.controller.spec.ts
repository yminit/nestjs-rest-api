import { Test } from "@nestjs/testing";
import { vi } from "vitest";
import { PostsController } from "./posts.controller.js";
import { PostsService } from "./posts.service.js";
import { mockPost, mockPosts } from "./__mocks__/posts.mock.js";

describe("PostController", () => {
  let controller: PostsController;

  const mockService = {
    findAll: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(PostsController);
  });

  it("전체 조회", async () => {
    mockService.findAll.mockResolvedValue(mockPosts);

    const result = await controller.findAll();

    expect(result).toEqual(mockPosts);
    expect(mockService.findAll).toHaveBeenCalledOnce();
  });

  it("상세 조회", async () => {
    mockService.findOne.mockResolvedValue(mockPost);

    const result = await controller.findOne(mockPost.id);

    expect(result).toEqual(mockPost);
    expect(mockService.findOne).toHaveBeenCalledWith(mockPost.id);
  });

  it("게시글 등록", async () => {
    const dto = {
      title: "테스트 게시글",
      content: "테스트 내용",
    };

    mockService.create.mockResolvedValue(mockPost);

    const result = await controller.create(dto);

    expect(result).toEqual(mockPost);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it("게시글 수정", async () => {
    const dto = { title: "수정된 제목" };
    const updated = { ...mockPost, ...dto };

    mockService.update.mockResolvedValue(updated);

    const result = await controller.update(mockPost.id, dto);

    expect(result).toEqual(updated);
    expect(mockService.update).toHaveBeenCalledWith(mockPost.id, dto);
  });

  it("게시글 삭제", async () => {
    mockService.remove.mockResolvedValue(mockPost);

    const result = await controller.remove(mockPost.id);

    expect(result).toEqual(mockPost);
    expect(mockService.remove).toHaveBeenCalledWith(mockPost.id);
  });
});
