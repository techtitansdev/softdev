import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";

export const blog = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        excerpt: z.string(),
        image: z.string(),
        content: z.string(),
        published: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const newBlog = {
        ...input,
      };

      const blog = await db.blogs.create({
        data: newBlog,
      });
      return blog;
    }),
  getAll: protectedProcedure.query(async () => {
    const allBlogs = await db.blogs.findMany();
    return allBlogs;
  }),
  getByTitle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      try {
        const blog = await db.projects.findFirst({
          where: { title: input.title },
        });

        if (!blog) {
          throw new Error("Blog does not exist");
        }

        return blog;
      } catch (error) {
        throw new Error(`Failed to fetch project: ${error}`);
      }
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        excerpt: z.string(),
        image: z.string(),
        content: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const existingBlog = await db.blogs.findUnique({
        where: { id: input.id },
      });

      if (!existingBlog) {
        throw new Error("Blog Does Not Exist");
      }
      const newDetails = {
        ...input,
      };

      const updatedBlog = await db.blogs.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
      return updatedBlog;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const existingBlog = await db.blogs.findUnique({
        where: { id: input.id },
      });

      if (!existingBlog) {
        throw new Error("Blog Does Not Exist");
      }

      await db.blogs.delete({
        where: { id: input.id },
      });
    }),
});
