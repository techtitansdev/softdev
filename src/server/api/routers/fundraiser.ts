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
            milestones: z.array(z.object({
                milestone: z.string(),
                value: z.number(),
                unit: z.string(),
                description: z.string(),
            })),
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

        // Prepare the data for creating the fundraiser
        const newFundraiserData = {
            projectId: input.projectId,
            funds: input.funds,
            goal: input.goal,
            targetDate: input.targetDate,
            donors: input.donors,
        };9
        // Create the fundraiser
        const fundraiser = await db.fundraisers.create({
            data: newFundraiserData,
        });
        // If milestones are provided, create them one by one and associate them with the fundraiser
        if (input.milestones && input.milestones.length > 0) {
            for (const milestoneInput of input.milestones) {
                const newMilestoneData = {
                    ...milestoneInput,
                    fundraiserId: fundraiser.id,
                };
                await db.milestones.create({
                    data: newMilestoneData,
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
      milestones: z.array(
        z.object({
          milestone: z.string(),
          value: z.number(),
          unit: z.string(),
          description: z.string(),
        })
      ),
    })
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

    // Prepare updated details
    const newDetails = {
      ...input,
      milestones: {
        // Map milestones to the appropriate format for database update
        // Assuming milestones is an array of objects
        // with properties 'milestone', 'value', 'unit', 'description'
        // and there's a nested relationship 'milestones' in the database model
        // that needs to be updated.
        updateMany: input.milestones.map((milestone) => ({
          where: { milestone: milestone.milestone }, // Assuming 'milestone' is unique
          data: milestone,
        })),
      },
    };

    // Update fundraiser details in the database
    const updatedFundraiser = await db.fundraisers.update({
      where: {
        id: input.id,
      },
      data: newDetails,
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

      // Check if fundraiser exists:
      const existingFundraiser = await db.fundraisers.findUnique({
        where: { id: input.id },
        include: { milestones: true }, // Include associated milestones
      });

      if (!existingFundraiser) {
        throw new Error("Fundraiser Does Not Exist");
      }

      // Delete associated milestones
      const deleteMilestonePromises = existingFundraiser.milestones.map(async (milestone) => {
        await db.milestones.delete({
          where: { id: milestone.id },
        });
      });
      await Promise.all(deleteMilestonePromises);

      // Delete the fundraiser
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
            milestones:true,
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
