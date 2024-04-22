import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const donors = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        fullName: z.string().nullable(),
        email: z.string().nullable(),
        phone: z.string().nullable(),
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
