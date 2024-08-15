/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../../server/api/trpc";
import { db } from "../../../server/db";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        id:z.string(),
        email: z.string().toLowerCase(),
        firstName: z.string(),
        lastName: z.string(),
        address: z.string(),
        phone: z.string(),
        password: z.string(),
        emailVerified: z.boolean(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //check if email already exists in the database
      const existingEmail = await db.users.findUnique({
        where: { email: input.email },
      });

      if (existingEmail) {
        throw new Error("Email is already in use");
      }

      //hash the password
      const saltRounds = 13;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const hashedPassword = await bcrypt.hash(input.password, saltRounds);

      //add user credentials to the database
      const newUser = {
        ...input,
        password: hashedPassword,
        emailVerifiedAt: new Date().toISOString(),
      };

      const user = await db.users.create({
        data: newUser,
      });
      return user;
    }),
  getByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async (opts) => {
      const { input } = opts;

      try {
        const foundUser = await db.users.findFirst({
          where: { email: input.email },
        });

        if (!foundUser) {
          throw new Error("User not found");
        }

        return foundUser;
      } catch (error) {
        throw new Error(`Failed to fetch user: ${error as string}`);
      }
    }),
  verify: publicProcedure
    .input(
      z.object({
        email: z.string().toLowerCase(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //check if user exists
      const user = await db.users.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new Error("User does not exist");
      }

      //update verification data
      await db.users.update({
        where: {
          email: input.email,
        },
        data: {
          emailVerified: true,
          emailVerifiedAt: new Date().toISOString(),
        },
      });
    }),
    getRole: publicProcedure
    .input(z.object({ email: z.string().toLowerCase() }))
    .query(async ({ input }) => {
      const { email } = input;

      // Fetch user from the database
      const user = await db.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Return the user's role
      return user.role;
    }),
  getAdmins: publicProcedure.query(async () => {
    // Fetch all users with the role of ADMIN
    const admins = await db.users.findMany({
      where: {
        role: "ADMIN",
      },
    });

    // If no admins are found, you might want to throw an error or return an empty array
    if (!admins.length) {
      throw new Error("No ADMIN users found");
    }

    // Return the list of ADMIN users
    return admins;
  }),
  setRole: protectedProcedure
    .input(
      z.object({
        email: z.string().toLowerCase(),
        role: z.string().toUpperCase(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;

      //check if user exists
      const user = await db.users.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      //update user role
      await db.users.update({
        where: {
          email: input.email,
        },
        data: {
          role: input.role,
        },
      });
    }),
  removeAdmin: publicProcedure
    .input(
      z.object({
        email: z.string(), // Expect an email as input
      }),
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      // Update the user role from ADMIN to USER
      const updatedUser = await db.users.update({
        where: { email },
        data: { role: "USER" },
      });

      // Handle the case where the user does not exist or is not an ADMIN
      if (!updatedUser) {
        throw new Error(
          `User with email ${email} not found or already a USER.`,
        );
      }

      return {
        success: true,
        message: `User ${email} has been changed to USER.`,
      };
    }),
});

export const userCaller = userRouter.createCaller;
