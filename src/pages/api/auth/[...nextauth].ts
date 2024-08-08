import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

const modifiedAuthOptions = {
    ...authOptions,
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(modifiedAuthOptions);
