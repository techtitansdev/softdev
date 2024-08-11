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
        fundraiserId: z.string(),
        description: z.string(),
        date: z.date(),
        done: z.boolean(),
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

export const milestoneCaller = milestone.createCaller;