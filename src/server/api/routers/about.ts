import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const about = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
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
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const newAbout = {
        projectId: input.projectId,
        projectTitle: input.projectTitle,
        projectDescription: input.projectDescription,
        projectLink: input.projectLink,
        projectImage: input.projectImage,
        projectObjDescription: input.projectObjDescription,
        projectObjImage: input.projectObjImage,
        projectName1: input.projectName1,
        projectName1Description: input.projectName1Description,
        projectName1Image: input.projectName1Image,
        projectName2: input.projectName2,
        projectName2Description: input.projectName2Description,
        projectName2Image: input.projectName2Image,
        theme: input.theme,
      };

      const about = await db.about.create({
        data: newAbout,
      });
      return about;
    }),

  getByFundraiser: protectedProcedure
    .input(
      z.object({
        fundraiserId: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      const allMilestones = await db.milestones.findMany({
        where: {
          fundraiserId: input.fundraiserId,
        },
      });
      return allMilestones;
    }),
});

export const aboutCaller = about.createCaller;
