import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import { blogCaller } from "../blog";

vi.mock("src/server/__mocks__/db.ts");

describe("Fundraiser procedures testing", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function createInnerTRPCContext(session: Session) {
    const prismaMock = new PrismaClient();
    return {
      session,
      user: session.user,
      db: prismaMock,
    };
  }

  const session: Session = {
    expires: "1",
    user: {
      id: "clgb17vnp000008jjere5g15i",
      name: "",
    },
  };
  const ctx = createInnerTRPCContext(session);
  const caller = blogCaller(ctx);

  describe("Blog Procedures", () => {
    it("Should Create a new blog", async () => {
      const input = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      try {
        const result = await caller.create(input);
        expect(result.title).toBe(input.title);
        expect(result.excerpt).toBe(input.excerpt);
        expect(result.image).toBe(input.image);
        expect(result.content).toBe(input.content);
        expect(result.published).toBe(false);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    it("Should succesfully edit blog details", async () => {
      const input = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      const blog = await caller.create(input);

      const editInput = {
        id: blog.id,
        title: "edit blog title",
        excerpt: "edit blog excerpt",
        image: "edit blog image",
        content: "edit blog content",
        published: false,
        featured: false,
      };
      try {
        const result = await caller.edit(editInput);
        expect(result.title).toBe(editInput.title);
        expect(result.excerpt).toBe(editInput.excerpt);
        expect(result.image).toBe(editInput.image);
        expect(result.content).toBe(editInput.content);
        expect(result.published).toBe(false);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    it("should succesfully get all blogs", async () => {
      const input1 = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      const input2 = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      try {
        await ctx.db.blogs.deleteMany({});

        await caller.create(input1);
        await caller.create(input2);

        const allBlogs = await caller.getAll();
        expect(allBlogs.length).toBe(2);

        expect(allBlogs[0]?.title).toBe(input1.title);
        expect(allBlogs[0]?.excerpt).toBe(input1.excerpt);
        expect(allBlogs[0]?.image).toBe(input1.image);
        expect(allBlogs[0]?.content).toBe(input1.content);
        expect(allBlogs[0]?.published).toBe(false);

        expect(allBlogs[1]?.title).toBe(input2.title);
        expect(allBlogs[1]?.excerpt).toBe(input2.excerpt);
        expect(allBlogs[1]?.image).toBe(input2.image);
        expect(allBlogs[1]?.content).toBe(input2.content);
        expect(allBlogs[1]?.published).toBe(false);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    it("Should get a specific blog given blog id", async () => {
      const input1 = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      const input2 = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      try {
        const blog1 = await caller.create(input1);
        const blog2 = await caller.create(input2);

        const result1 = await caller.getById({ id: blog1.id });
        const result2 = await caller.getById({ id: blog2.id });

        expect(result1.title).toBe(input1.title);
        expect(result1.excerpt).toBe(input1.excerpt);
        expect(result1.image).toBe(input1.image);
        expect(result1.content).toBe(input1.content);
        expect(result1.published).toBe(false);

        expect(result1.title).toBe(blog1.title);
        expect(result1.excerpt).toBe(blog1.excerpt);
        expect(result1.image).toBe(blog1.image);
        expect(result1.content).toBe(blog1.content);
        expect(result1.published).toBe(false);

        expect(result2.title).toBe(input2.title);
        expect(result2.excerpt).toBe(input2.excerpt);
        expect(result2.image).toBe(input2.image);
        expect(result2.content).toBe(input2.content);
        expect(result2.published).toBe(false);

        expect(result2.title).toBe(blog2.title);
        expect(result2.excerpt).toBe(blog2.excerpt);
        expect(result2.image).toBe(blog2.image);
        expect(result2.content).toBe(blog2.content);
        expect(result2.published).toBe(false);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    it("should delete existing blogs", async () => {
      const input = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };

      const blog = await caller.create(input);

      try {
        await caller.delete({ id: blog.id });
      } catch (error) {
        console.error("Error during deleting", error);
        throw error;
      }
    });
    it("should make a blog featured", async () => {
      const input = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      const blog = await caller.create(input);

      const editInput = {
        id: `${blog.id}`,
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: true,
      };
      try {
        const result = await caller.edit(editInput);

        expect(result.featured).toBe(true);
      } catch (error) {
        console.error("Error during edit:", error);
        throw error;
      }
    });
    it("should make a blog not featured", async () => {
      const input = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: true,
      };
      const blog = await caller.create(input);

      const editInput = {
        id: `${blog.id}`,
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: false,
      };
      try {
        const result = await caller.edit(editInput);

        expect(result.featured).toBe(false);
      } catch (error) {
        console.error("Error during edit:", error);
        throw error;
      }
    });
    it("should count featured projects", async () => {
      await ctx.db.blogs.deleteMany({});
      const input = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: true,
      };
      const input1 = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: true,
      };
      const input2 = {
        title: "blog title",
        excerpt: "blog excerpt",
        image: "blog image",
        content: "blog content",
        published: false,
        featured: true,
      };
      await caller.create(input);
      await caller.create(input1);
      await caller.create(input2);

      const count = await caller.getFeaturedCount();

      expect(count).toBe(3);
    });
  });
});
