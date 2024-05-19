import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const fundraiser = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        funds: z.number(),
        goal: z.number(),
        targetDate: z.date(),
        donors: z.number(),
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
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        funds: z.number(),
        goal: z.number(),
        targetDate: z.date(),
        donors: z.number(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //check if fundraiser exists
      const existingFundraiser = await db.fundraisers.findUnique({
        where: { id: input.id },
      });

      if (!existingFundraiser) {
        throw new Error("Fundraiser does not exist");
      }

      const newDetails = {
        ...input,
      };

      //update fundraiser details in the database
      const updatedFundraiser = await db.fundraisers.update({
        where: {
          id: input.id,
        },
        data: newDetails,
      });
      return updatedFundraiser;
    }),
    updateFunds: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            funds: z.number(),
        }),
    )
    .mutation(async (opts) => {
        const { input } = opts;

        // Check if fundraiser exists
        const existingFundraiser = await db.fundraisers.findUnique({
            where: { id: input.id },
        });

        if (!existingFundraiser) {
            throw new Error("Fundraiser does not exist");
        }

        // Query existing funds
        const existingFunds = existingFundraiser.funds || 0;

        // Add input amount to existing funds
        const updatedFunds = existingFunds + input.funds;

        // Update fundraiser details in the database
        const updatedFundraiser = await db.fundraisers.update({
            where: {
                id: input.id,
            },
            data: {
                funds: updatedFunds,
            },
        });

        return updatedFundraiser;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //check if project exists:
      const existingFundraiser = await db.fundraisers.findUnique({
        where: { id: input.id },
      });

      if (!existingFundraiser) {
        throw new Error("Fundraiser Does Not Exist");
      }

      await db.fundraisers.delete({
        where: { id: input.id },
      });
    }),

  getAll: protectedProcedure.query(async () => {
    const allFundraisers = await db.fundraisers.findMany({
      include: {
        project: true,
      },
    });
    return allFundraisers;
  }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      try {
        const foundFunding = await db.fundraisers.findUnique({
          where: { id: input.id },
          include: {
            project: true,
          },
        });

        if (!foundFunding) {
          throw new Error("Fundraiser not found");
        }

        return foundFunding;
      } catch (error) {
        throw new Error(`Failed to fetch fundraiser: ${error}`);
      }
    }),
});

export const fundraiserCaller = fundraiser.createCaller;
