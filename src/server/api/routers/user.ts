import { z } from "zod";
import { createTRPCRouter, publicProcedure, } from "~/server/api/trpc";
import { db } from "~/server/db";


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

            //insert password hashing below
            //const hashedPassword = something

            //add user credentials to the database
            const user = await db.user.create({
                data: {
                    ...input,
                    //password: hashedPassword,
                },
            });

            return user;
        }),

})