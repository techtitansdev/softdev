import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const feedback = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        projectId: z.string(),
        feedback: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      const feedback = await db.feedback.create({
        data: input,
      });
      return feedback;
    }),
  getAll: protectedProcedure.query(async () => {
    const allFeedbacks = await db.feedback.findMany();

    const feedbacks = allFeedbacks.map((feedback) => ({
      userId: feedback.userId,
      projectId: feedback.projectId,
      feedback: feedback.feedback,
    }));
    return feedbacks;
  }),
});