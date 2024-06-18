import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const categories = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        label: z.string(),
        value: z.string()

      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const newCategory = await db.categories.create({
        data: {
          label: input.label,
          value: input.value
        },
      });
      return newCategory;
    }),
  getAllCategories: publicProcedure.query(async () => {
    const allFundraisers = await db.categories.findMany();
    const categories = allFundraisers.map(category => ({
      label: category.label,
      value: category.value
    }));
    return categories;
  })
});


export const categoriesCaller = categories.createCaller;

