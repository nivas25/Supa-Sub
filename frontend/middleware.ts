import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are "Protected" (Private)
// This matches /dashboard and anything after it (like /dashboard/settings)
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // 2. If the user is trying to visit a protected route...
  if (isProtectedRoute(req)) {
    // ...check if they are logged in. If not, redirect to Sign In.
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // This complex "matcher" tells Next.js which files to ignore (like images/css)
    // and which ones to run the bouncer check on.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
