import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const project = createTRPCRouter({
  create: publicProcedure
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
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //add project credentials to the database
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
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

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
});

export const projectCaller = project.createCaller;
