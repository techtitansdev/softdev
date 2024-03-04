import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const milestone = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        value: z.number(),
        unit: z.string(),
        projectId: z.string(),
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
});
