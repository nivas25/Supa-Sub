import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // 'next' allows you to redirect to a specific page after login if needed
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();

    // Exchange the code for a session
    // This is what officially logs the user in
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // We use a permanent redirect logic to clean up browser history
      const forwardTo = new URL(next, origin);
      return NextResponse.redirect(forwardTo);
    }
  }

  // If there's an error or no code, send them to the error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
