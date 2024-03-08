import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categories = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const newCategory = await db.categories.create({
        data: input,
      });
      return newCategory;
    }),
});

export const categoriesCaller = categories.createCaller;

