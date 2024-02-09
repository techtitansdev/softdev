import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const fundraiser = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        funds: z.number(),
        goal: z.number(),
        targetDate: z.date(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      // Check if a fundraiser with the given project id already exists
      const existingFundraiser = await db.fundraisers.findUnique({
        where: {
          projectId: input.projectId,
        },
      });

      if (existingFundraiser) {
        throw new Error("This project already has a fundraiser");
      }

      const newFundraiser = {
        ...input,
      };

      const fundraiser = await db.fundraisers.create({
        data: newFundraiser,
      });
      return fundraiser;
    }),
  getAll: publicProcedure.query(async () => {
    const allFundraisers = await db.fundraisers.findMany();
    return allFundraisers;  
  }),
});
