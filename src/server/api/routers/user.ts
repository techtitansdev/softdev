import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure, } from "~/server/api/trpc";
import { db } from "~/server/db";
import bcrypt from 'bcrypt';

export const userRouter = createTRPCRouter({
    /**
     * 
     *  const createNewUser = api.user.create.useMutation({
        onError: error => {
            console.log(error.name)
        },
        onSuccess: () => {
            
        }
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        createNewUser.mutate({ email, firstName, lastName, address, phone, password });
    }
     */
    create: publicProcedure
        .input(z.object({
            email: z.string().toLowerCase(),
            firstName: z.string(),
            lastName: z.string(),
            address: z.string(),
            phone: z.string(),
            password: z.string(),
        }))
        .mutation(async (opts) => {
            const { input } = opts;

            //check if email already exists in the database
            const existingEmail = await db.users.findUnique({
                where: { email: input.email }
            });

            if (existingEmail) {
                throw new Error('Email is already in use');
            }

            //hash the password
            const saltRounds = 13;
            const hashedPassword = await bcrypt.hash(input.password, saltRounds);

            //add user credentials to the database
            const newUser = {
                ...input,
                password: hashedPassword,
            };

            const user = await db.users.create({
                data: newUser,
            });
            return user;
        }),
    verify: publicProcedure
        .input(z.object({
            email: z.string().toLowerCase(),
        }))
        .mutation(async (opts) => {
            const { input } = opts;

            //check if user exists
            const user = await db.users.findUnique({
                where: { email: input.email }
            })
            if (!user) {
                throw new Error('User does not exist')
            }

            //update verification data
            await db.users.update({
                where: {
                    email: input.email
                },
                data: {
                    emailVerified: true,
                    emailVerifiedAt: new Date().toISOString(),
                }
            })
        }),
    getRole: protectedProcedure
        .input(z.object({
            email: z.string().toLowerCase()
        }))
        .query(async (opts) => {
            const { input } = opts;

            //check if user exists
            const user = await db.users.findUnique({
                where: {
                    email: input.email
                }
            });
            if (!user) {
                throw new Error('User not found');
            }
            //return the user role
            return user.role;
        }),

    setRole: protectedProcedure
        .input(z.object({
            email: z.string().toLowerCase(),
            role: z.string().toUpperCase()
        }))
        .mutation(async (opts) => {
            const { input } = opts;

            //check if user exists
            const user = await db.users.findUnique({
                where: {
                    email: input.email
                }
            })
            if (!user) {
                throw new Error('User not found')
            }

            //update user role
            await db.users.update({
                where: {
                    email: input.email
                },
                data: {
                    role: input.role
                }
            })
        })
});

