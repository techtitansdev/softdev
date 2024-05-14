// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//   publicRoutes: ['/','/register', "/api/auth/session",'/login','/home',"/api/user/getRole",'/admin/projects']
// });


import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
  
  publicRoutes: ['/','/register', "/api/auth/session",'/login','/home',"/api/user/getRole","/api/trpc/user.create"],
  afterAuth(user, req, evt) {
    // Handle users who aren't authenticated
    if (!user.userId && !user.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Redirect logged in users to home page if they are logged in
    if (
      user.userId &&
      req.nextUrl.pathname === "/login"
    ) {
      const home = new URL("/home", req.url);

      return NextResponse.redirect(home);
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (user.userId && !user.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
