import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const donors = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userEmail: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const donor = await db.donors.create({
        data: input,
      });
      return donor;
    }),
});

export const donorsCaller = donors.createCaller;

