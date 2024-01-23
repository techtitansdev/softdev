import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes:['/','/register', "/api/auth/session",'/login','/home', '/about-us', '/impact', '/partners', '/projects/tech4all']
});
 
export const config = {
 matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
};
