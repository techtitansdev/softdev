/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, publicProcedure, } from "~/server/api/trpc";
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
            const existingEmail = await db.user.findUnique({
                where: { email: input.email }
            });

            if (existingEmail) {
                throw new Error('Email is already in use');
            }

            //hash the password
            const saltRounds = 13;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const hashedPassword = await bcrypt.hash(input.password, saltRounds);

            //add user credentials to the database
            const newUser = {
                ...input,
                password: hashedPassword,
            };

            const user = await db.user.create({
                data: newUser,
            });
            return user;
        }),

})