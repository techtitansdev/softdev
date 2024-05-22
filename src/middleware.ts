import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/register",
    "/login",
    "/home",
    "/about-us",
    "/blogs",
    "/impact",
    "/projects",
    "/partners",
    "/funded-projects",

    "/api/trpc/project.getAll",
    "/api/trpc/project.getAll,categories.getAllCategories",

    "/projects/:id*",
    "/api/trpc/project.getById",
    "/api/trpc/categories.getAllCategories,project.getAll",

    "/funded-projects/:id*",
    "/api/trpc/fundraiser.getAll,categories.getAllCategories",
    "/api/trpc/categories.getAllCategories,fundraiser.getAll",
    // "/api/trpc/fundraiser.getAll",
    "/api/trpc/fundraiser.getById",

    "/blogs/:id*",
    "/api/trpc/blog.getAll",
    "/api/trpc/blog.getById",
    
    "/api/auth/session",
    "/api/user/getRole",
    "/api/trpc/user.create",
  ],

  afterAuth(user, req, evt) {
    // Handle users who aren't authenticated
    if (!user.userId && !user.isPublicRoute) {
      new NextResponse("Page Not Found", { status: 404 })
    }
    // Redirect logged in users to home page if they are logged in
    if (user.userId && req.nextUrl.pathname === "/login") {
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
