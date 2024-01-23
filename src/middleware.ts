import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
<<<<<<< HEAD
    publicRoutes:['/','/register', "/api/auth/session",'/login','/home', '/admin',"/api/user/getRole"]
=======
    publicRoutes:['/','/register', "/api/auth/session",'/login','/home', '/admin']
>>>>>>> 48bf7c18d39ae36a1bbbeabf433caaf7fe829dd0
});
 
export const config = {
 matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
};
