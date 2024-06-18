import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const funding = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        fullName: z.string(),
        email: z.string(),
        contact: z.string(),
        fundraiserId: z.string(),
        amount: z.number(),
        paymentMethod: z.string(),
        donatedAs: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const donor = await db.fundings.create({
        data: {
          fullName: input.fullName,
          email: input.email,
          contact: input.contact,
          fundraiserId: input.fundraiserId,
          amount: input.amount,
          paymentMethod: input.paymentMethod,
          donatedAs: input.donatedAs,
        },
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
        donorEmail: funding.email,
        fundraiserId: funding.fundraiserId,
        amount: funding.amount,
        paymentMethod: funding.paymentMethod,
      }));
    }),

  getAll: protectedProcedure.query(async () => {
    const allFundings = await db.fundings.findMany({
      orderBy: {
        date: "desc",
      },
    });

    const fundingDetails = await Promise.all(
      allFundings.map(async (funding) => {
        const fundraiser = await db.fundraisers.findUnique({
          where: { id: funding.fundraiserId },
        });

        const project = await db.projects.findUnique({
          where: { id: fundraiser?.projectId },
        });

        return {
          fullName: funding.fullName, 
          email: funding.email,
          contact: funding.contact,
          date: funding.date,
          projectName: project?.title,
          paymentMethod: funding.paymentMethod,
          amount: funding.amount,
        };
      }),
    );

    return fundingDetails;
  }),
});

export const fundingCaller = funding.createCaller;
