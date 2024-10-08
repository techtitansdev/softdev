import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";
import { project } from "./routers/project";
import { fundraiser } from "./routers/fundraiser";
import { blog } from "./routers/blog";
import { milestone } from "./routers/milestone";
import { categories } from "./routers/categories";
import { feedback } from "./routers/feedback";
import { paymentRouter } from "./routers/payment";
import { donors } from "./routers/donors";
import { funding } from "./routers/funding";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  admin: adminRouter,
  project: project,
  fundraiser: fundraiser,
  blog: blog,
  milestone: milestone,
  categories: categories,
  feedback: feedback,
  paymentRouter:paymentRouter,
  donors:donors,
  funding: funding,
});

// export type definition of API
export type AppRouter = typeof appRouter;
