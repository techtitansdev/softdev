import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const project = createTRPCRouter({
  createProject: protectedProcedure
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
          theme: z.string(),
        }),
        published: z.boolean(),
        featured: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      // Create the project first
      const project = await db.projects.create({
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          hub: input.hub,
          category: input.category,
          type: input.type,
          beneficiaries: input.beneficiaries,
          published: input.published,
          featured: input.featured,
        },
      });

      // Now create the "about" entry using the newly created project's ID
      const aboutData = {
        projectId: project.id, // Use the ID from the created project
        projectTitle: input.about.projectTitle,
        projectDescription: input.about.projectDescription,
        projectLink: input.about.projectLink,
        projectImage: input.about.projectImage,
        projectObjDescription: input.about.projectObjDescription,
        projectObjImage: input.about.projectObjImage,
        projectName1: input.about.projectName1,
        projectName1Description: input.about.projectName1Description,
        projectName1Image: input.about.projectName1Image,
        projectName2: input.about.projectName2,
        projectName2Description: input.about.projectName2Description,
        projectName2Image: input.about.projectName2Image,
        theme: input.about.theme,
      };

      await db.about.create({
        data: aboutData,
      });

      return project;
    }),

  editProject: protectedProcedure
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
          theme: z.string(),
        }),
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

      // Check if project exists
      const existingProject = await db.projects.findUnique({
        where: { id: input.id },
      });

      if (!existingProject) {
        throw new Error("Project Does Not Exist");
      }

      // Update project details in the database
      const updatedProject = await db.projects.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          hub: input.hub,
          category: input.category,
          type: input.type,
          beneficiaries: input.beneficiaries,
          published: input.published,
          featured: input.featured,
        },
      });

      // Update the "about" entry related to the project
      await db.about.update({
        where: { projectId: input.id },
        data: {
          projectTitle: input.about.projectTitle,
          projectDescription: input.about.projectDescription,
          projectLink: input.about.projectLink,
          projectImage: input.about.projectImage,
          projectObjDescription: input.about.projectObjDescription,
          projectObjImage: input.about.projectObjImage,
          projectName1: input.about.projectName1,
          projectName1Description: input.about.projectName1Description,
          projectName1Image: input.about.projectName1Image,
          projectName2: input.about.projectName2,
          projectName2Description: input.about.projectName2Description,
          projectName2Image: input.about.projectName2Image,
          theme: input.about.theme,
        },
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
          include: {
            about: true,
          },
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
          include: {
            about: true, // Assuming 'about' is a related entity
          },
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
