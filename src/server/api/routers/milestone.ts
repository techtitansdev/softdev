import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const milestone = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        milestone: z.string(),
        value: z.number(),
        unit: z.string(),
        projectId: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const newMilestone = {
        ...input,
      };
      const milestone = await db.milestones.create({
        data: newMilestone,
      });
      return milestone;
    }),
  getByProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      const allMilestones = await db.milestones.findMany({
        where: {
          projectId: input.projectId,
        },
      });
      return allMilestones;
    }),
});
