import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const adminRouter = createTRPCRouter({
    check: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ input }) => {
            const exist = await db.admins.findUnique({
                where: {
                    userEmail: input.email
                }
            })

            return exist !== null;
        })
})