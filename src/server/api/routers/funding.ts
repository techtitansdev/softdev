import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const funding = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        donorEmail: z.string(),
        fundraiserId: z.string(),
        amount: z.number(),
        paymentMethod: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const donor = await db.fundings.create({
        data: input,
      });
      return donor;
    }),
  getByFundraiser: protectedProcedure
    .input(
      z.object({
        fundraiserId: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      const fundings = await db.fundings.findMany({
        where: {
          fundraiserId: input.fundraiserId,
        },
      });

      return fundings.map((funding) => ({
        donorEmail: funding.donorEmail,
        fundraiserId: funding.fundraiserId,
        amount: funding.amount,
        paymentMethod: funding.paymentMethod,
      }));
    }),
});

export const fundingCaller = funding.createCaller;
