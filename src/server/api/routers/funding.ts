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
  getAll: protectedProcedure.query(async () => {
    const allFundings = await db.fundings.findMany({
      include: {
        donor: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        fundraiser: {
          select: {
            project: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    allFundings.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return allFundings.map(funding => ({
      name: `${funding.donor.user.firstName} ${funding.donor.user.lastName}`,
      email: funding.donor.user.email,
      contact: funding.donor.user.phone,
      date: funding.date,
      projectName: funding.fundraiser.project.title,
      paymentMethod: funding.paymentMethod,
      amount: funding.amount,
    }));
  }),
});

export const fundingCaller = funding.createCaller;
