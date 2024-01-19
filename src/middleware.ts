import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes:['/','/register', "/api/auth/session",'/login','/home','/api/trpc-playground']
});
 
export const config = {
 matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
};
