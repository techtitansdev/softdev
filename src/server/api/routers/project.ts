import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const project = createTRPCRouter({
  newcreate: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        hub: z.string(),
        category: z.string(),
        type: z.string(),
        beneficiaries: z.string(),
        about: z.object({
          projectTitle: z.string(),
          projectDescription: z.string(),
          projectLink: z.string(),
          projectImage: z.string(),
          projectObjDescription: z.string(),
          projectObjImage: z.string(),
          projectName1: z.string(),
          projectName1Description: z.string(),
          projectName1Image: z.string(),
          projectName2: z.string(),
          projectName2Description: z.string(),
          projectName2Image: z.string(),
          theme: z.string(),}),
        published: z.boolean(),
        featured: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const newProject = {
        ...input,
        about: JSON.stringify(input.about), 
      };
    
    const project = await db.projects.create({
      data: newProject,
    });
    return project;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        hub: z.string(),
        category: z.string(),
        type: z.string(),
        beneficiaries: z.string(),
        about: z.string(),
        published: z.boolean(),
        featured: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const newProject = {
        ...input,
      };
      const project = await db.projects.create({
        data: newProject,
      });
      return project;
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
        hub: z.string(),
        category: z.string(),
        type: z.string(),
        beneficiaries: z.string(),
        about: z.string(),
        published: z.boolean(),
        featured: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      // Check if the project is being featured and if the maximum limit is reached
      if (input.featured) {
        const featuredProjects = await db.projects.count({
          where: { featured: true },
        });
        if (featuredProjects >= 4) {
          throw new Error("Maximum number of featured projects reached.");
        }
      }

      //check if project exists
      const existingProject = await db.projects.findUnique({
        where: { id: input.id },
      });

      if (!existingProject) {
        throw new Error("Project Does Not Exist");
      }
      const newDetails = {
        ...input,
      };

      //update project details in the database
      const updatedProject = await db.projects.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
      return updatedProject;
    }),

  getFeaturedCount: protectedProcedure.query(async () => {
    const featuredProjectsCount = await db.projects.count({
      where: { featured: true },
    });
    return featuredProjectsCount;
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //check if project exists:
      const existingProject = await db.projects.findUnique({
        where: { id: input.id },
      });

      if (!existingProject) {
        throw new Error("Project Does Not Exist");
      }

      await db.projects.delete({
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure.query(async () => {
    const allProjects = await db.projects.findMany();
    return allProjects;
  }),

  getAllProjectTitles: protectedProcedure.query(async () => {
    const allProjects = await db.projects.findMany({ select: { title: true } });
    return allProjects.map((project) => project.title);
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
        const foundProject = await db.projects.findFirst({
          where: { title: input.title },
        });

        if (!foundProject) {
          throw new Error("Project not found");
        }

        return foundProject;
      } catch (error) {
        throw new Error(`Failed to fetch project: ${error as string}`);
      }
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
        const foundProject = await db.projects.findUnique({
          where: { id: input.id },
        });

        if (!foundProject) {
          throw new Error("Project not found");
        }

        return foundProject;
      } catch (error) {
        throw new Error(`Failed to fetch project: ${error as string}`);
      }
    }),

  removeImage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      try {
        const foundProject = await db.projects.findUnique({
          where: { id: input.id },
        });

        if (!foundProject) {
          throw new Error("Project not found");
        } else {
          foundProject.image = "";
        }
      } catch (error) {
        throw new Error(`Failed to fetch project: ${error as string}`);
      }
    }),
});

export const projectCaller = project.createCaller;
