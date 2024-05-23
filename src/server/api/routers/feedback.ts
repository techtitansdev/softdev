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

    allFeedbacks.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );

    const feedbacks = await Promise.all(
      allFeedbacks.map(async (feedback) => {
        const user = await db.users.findUnique({
          where: { id: feedback.userId },
        });

        const project = await db.projects.findUnique({
          where: { id: feedback.projectId },
        });

        return {
          name: `${user?.firstName} ${user?.lastName}`,
          date: feedback.created,
          email: user?.email,
          comment: feedback.feedback,
          projectName: project?.title,
        };
      }),
    );

    return feedbacks;
  }),

  getByProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      const feedbacks = await db.feedback.findMany({
        where: {
          projectId: input.projectId,
        },
      });

      return feedbacks.map((feedback) => ({
        userId: feedback.userId,
        projectId: feedback.projectId,
        feedback: feedback.feedback,
      }));
    }),
});
export const feedbackCaller = feedback.createCaller;
