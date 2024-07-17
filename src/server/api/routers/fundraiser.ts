import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const fundraiser = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        funds: z.number(),
        goal: z.number(),
        targetDate: z.date(),
        donors: z.number(),
        published: z.boolean(),
        milestones: z.array(z.object({
          milestone: z.string(),
          value: z.number(),
          unit: z.string(),
          description: z.string(),
        })).optional(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const existingFundraiser = await db.fundraisers.findUnique({
        where: {
          projectId: input.projectId,
        },
      });

      if (existingFundraiser) {
        throw new Error("This project already has a fundraiser");
      }

      const fundraiser = await db.fundraisers.create({
        data: {
          projectId: input.projectId,
          funds: input.funds,
          goal: input.goal,
          targetDate: input.targetDate,
          donors: input.donors,
          published: input.published,
        },
      });

      if (input.milestones) {
        for (const milestone of input.milestones) {
          await db.milestones.create({
            data: {
              ...milestone,
              fundraiserId: fundraiser.id,
            },
          });
        }
      }

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
        published: z.boolean(),
        milestones: z.array(z.object({
          id: z.string().optional(),
          milestone: z.string(),
          value: z.number(),
          unit: z.string(),
          description: z.string(),
        })).optional(),
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

      // Update fundraiser details
      const updatedFundraiser = await db.fundraisers.update({
        where: { id: input.id },
        data: {
          funds: input.funds,
          goal: input.goal,
          targetDate: input.targetDate,
          donors: input.donors,
          published: input.published,
        },
      });

      // Update milestones if provided
      if (input.milestones) {
        // Fetch existing milestones
        const existingMilestones = await db.milestones.findMany({
          where: { fundraiserId: input.id },
        });

        // Create a map for quick lookup
        const existingMilestoneMap = new Map(existingMilestones.map(m => [m.id, m]));

        // Process each milestone from input
        for (const milestone of input.milestones) {
          if (milestone.id) {
            // Update existing milestone
            if (existingMilestoneMap.has(milestone.id)) {
              await db.milestones.update({
                where: { id: milestone.id },
                data: {
                  milestone: milestone.milestone,
                  value: milestone.value,
                  unit: milestone.unit,
                  description: milestone.description,
                },
              });
              existingMilestoneMap.delete(milestone.id);
            }
          } else {
            // Create new milestone
            await db.milestones.create({
              data: {
                milestone: milestone.milestone,
                value: milestone.value,
                unit: milestone.unit,
                description: milestone.description,
                fundraiserId: input.id,
              },
            });
          }
        }

        // Delete remaining milestones in the map (those not in the input)
        for (const remainingMilestone of existingMilestoneMap.values()) {
          await db.milestones.delete({
            where: { id: remainingMilestone.id },
          });
        }
      }

      return updatedFundraiser;
    }),
  updateFunds: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        funds: z.number(),
        donors: z.number(),
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

     // Query existing funds and donors
     const existingFunds = existingFundraiser.funds || 0;
     const existingDonors = existingFundraiser.donors || 0;
 
     // Add input amount to existing funds and increment donors count
     const updatedFunds = existingFunds + input.funds;
     const updatedDonors = existingDonors + input.donors;
 

      // Update fundraiser details in the database
      const updatedFundraiser = await db.fundraisers.update({
        where: {
          id: input.id,
        },
        data: {
          funds: updatedFunds,
          donors: updatedDonors,
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

  getAll: publicProcedure.query(async () => {
    const allFundraisers = await db.fundraisers.findMany({
      include: {
        project: true,
      },
    });
    return allFundraisers;
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts: { input: { id: string } }) => {
      const { input }: { input: { id: string } } = opts;

      try {
        const foundFunding = await db.fundraisers.findUnique({
          where: { id: input.id },
          include: {
            project: true,
            milestones: true,
            fundings: true,
          },
        });

        if (!foundFunding) {
          throw new Error("Fundraiser not found");
        }

        return foundFunding;
      } catch (error) {
        throw new Error(`Failed to fetch fundraiser: ${error as string}`);
      }
    }),
});

export const fundraiserCaller = fundraiser.createCaller;
