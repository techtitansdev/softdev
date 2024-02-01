import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes:['/','/register', "/api/auth/session",'/login','/home', '/admin',"/api/user/getRole","/admin/projects"]
});
 
export const config = {
 matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
};
