import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure.query(({ctx}) => {
    return {
      greeting: `hello! ${ctx.user?.privateMetadata.role}`
    }
  }),
    
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
