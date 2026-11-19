import type { Post } from "../../generated/prisma/client.js";

export const mockPost: Post = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  title: "테스트 게시글",
  content: "테스트 내용",
  createdAt: new Date("2026-11-19T00:00:00Z"),
  updatedAt: new Date("2026-11-19T00:00:00Z"),
};

export const mockPosts: Post[] = [mockPost];
