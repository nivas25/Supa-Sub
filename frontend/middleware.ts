import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ["/home"];

  // Auth routes that should redirect to dashboard if already logged in
  const authRoutes = ["/auth/login"];

  // Routes that don't require authentication
  const publicRoutes = ["/", "/auth/callback", "/auth/auth-code-error"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  try {
    // Create a Supabase client using the request's cookie jar
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Silently ignore
            }
          },
        },
      }
    );

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If user is authenticated and trying to access auth routes, redirect to home
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    // If user is not authenticated and trying to access protected routes, redirect to home
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow the request to continue
    return NextResponse.next();
  } catch (error) {
    // If there's an error checking authentication, allow the request to continue
    // This prevents infinite redirects in case of errors
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
