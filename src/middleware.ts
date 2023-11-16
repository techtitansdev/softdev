import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes:['/','/register', "/api/auth/session"]
});
 
export const config = {
 matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
