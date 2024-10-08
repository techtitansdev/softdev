import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "../../db";

export const blog = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        excerpt: z.string(),
        image: z.string(),
        imageId: z.string(),
        blogTitle: z.string(),
        blogDescription: z.string(),
        blogImage: z.string(),
        blogImageId: z.string(),
        blogDescription1: z.string(),
        blogImage1: z.string(),
        blogImage1Id: z.string(),
        blogDescription2: z.string(),
        blogImage2: z.string(),
        blogImage2Id: z.string(),
        date: z.string(),
        published: z.boolean(),
        featured: z.boolean(),
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

  getAll: publicProcedure.query(async () => {
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
        throw new Error(`Failed to fetch project: ${error as string}`);
      }
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        excerpt: z.string(),
        image: z.string(),
        imageId: z.string(),
        blogTitle: z.string(),
        blogDescription: z.string(),
        blogImage: z.string(),
        blogImageId: z.string(),
        blogDescription1: z.string(),
        blogImage1: z.string(),
        blogImage1Id: z.string(),
        blogDescription2: z.string(),
        blogImage2: z.string(),
        blogImage2Id: z.string(),
        date: z.string(),
        published: z.boolean(),
        featured: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      if (input.featured) {
        const featuredBlogs = await db.blogs.count({
          where: { featured: true },
        });
        if (featuredBlogs >= 3) {
          throw new Error("Maximum number of featured projects reached.");
        }
      }

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

  editBlogFeatured: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        featured: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      if (input.featured) {
        const featuredBlogs = await db.blogs.count({
          where: { featured: true },
        });
        if (featuredBlogs >= 4) {
          throw new Error("Maximum number of featured blogs reached.");
        }
      }

      // Check if blog exists
      const existingBlog = await db.blogs.findUnique({
        where: { id: input.id },
      });

      if (!existingBlog) {
        throw new Error("Blog Does Not Exist");
      }

      // Update only the featured status
      const updatedBlog = await db.blogs.update({
        where: { id: input.id },
        data: {
          featured: input.featured,
        },
      });

      return updatedBlog;
    }),

  getFeaturedCount: protectedProcedure.query(async () => {
    const featuredBlogsCount = await db.blogs.count({
      where: { featured: true },
    });
    return featuredBlogsCount;
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

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      try {
        const foundBlog = await db.blogs.findUnique({
          where: { id: input.id },
        });

        if (!foundBlog) {
          throw new Error("Blog not found");
        }

        return foundBlog;
      } catch (error) {
        throw new Error(`Failed to fetch blog: ${error as string}`);
      }
    }),

  UpdateFeaturedImage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string(),
        imageId: z.string(),
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
        ...existingBlog,
        image: input.image,
        imageId: input.imageId,
      };

      const updatedBlog = await db.blogs.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
      return updatedBlog;
    }),
  UpdateBlogImage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        blogImage: z.string(),
        blogImageId: z.string(),
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
        ...existingBlog,
        blogImage: input.blogImage,
        blogImageId: input.blogImageId,
      };

      const updatedBlog = await db.blogs.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
      return updatedBlog;
    }),
  UpdateBlogImage1: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        blogImage1: z.string(),
        blogImage1Id: z.string(),
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
        ...existingBlog,
        blogImage1: input.blogImage1,
        blogImage1Id: input.blogImage1Id,
      };

      const updatedBlog = await db.blogs.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
      return updatedBlog;
    }),
  UpdateBlogImage2: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        blogImage2: z.string(),
        blogImage2Id: z.string(),
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
        ...existingBlog,
        blogImage2: input.blogImage2,
        blogImage2Id: input.blogImage2Id,
      };

      const updatedBlog = await db.blogs.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
      return updatedBlog;
    }),
});

export const blogCaller = blog.createCaller;
