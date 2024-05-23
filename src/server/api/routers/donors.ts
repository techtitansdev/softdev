import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const donors = createTRPCRouter({
    createDonor: protectedProcedure
        .input(z.object({
            userEmail: z.string().toLowerCase(),
        }))
        .mutation(async (opts) => {
            const { input } = opts;

            // Check if the user exists
            const user = await db.users.findUnique({
                where: { email: input.userEmail }
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Create the donor
            const donor = await db.donors.create({
                data: {
                    userEmail: input.userEmail,
                }
            });

            // Relate the donor to the user
            await db.users.update({
                where: { email: input.userEmail },
                data: {
                    donors: {
                        connect: { id: donor.id }
                    }
                }
            });

            return donor;
        }),

    checkEmailExists: publicProcedure
        .input(z.object({
            email: z.string().toLowerCase(),
        }))
        .query(async (opts) => {
            const { input } = opts;

            // Check if the email exists
            const user = await db.users.findUnique({
                where: { email: input.email }
            });

            return  !!user ;
        }),
        
        createFunding: protectedProcedure
        .input(z.object({
            donorEmail: z.string().toLowerCase(),
            fundraiserId: z.string(),
            amount: z.number().min(1),
            paymentMethod: z.string(),
        }))
        .mutation(async (opts) => {
            const { input } = opts;

            // Check if the donor exists
            let donor = await db.donors.findUnique({
                where: { userEmail: input.donorEmail }
            });

            // If donor doesn't exist, create a new donor
            if (!donor) {
                donor = await db.donors.create({
                    data: {
                        userEmail: input.donorEmail,
                    }
                });
            }

            // Check if the fundraiser exists
            const fundraiser = await db.fundraisers.findUnique({
                where: { id: input.fundraiserId }
            });

            if (!fundraiser) {
                throw new Error('Fundraiser not found');
            }

            // Create the funding
            const funding = await db.fundings.create({
                data: {
                    donorEmail: input.donorEmail,
                    fundraiserId: input.fundraiserId,
                    amount: input.amount,
                    paymentMethod: input.paymentMethod,
                }
            });

            return funding;
        })
});

export const donorsCaller = donors.createCaller;
