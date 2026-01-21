import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // CHANGED: Default to "/pages" instead of "/home"
  const next = searchParams.get("next") ?? "/pages";

  if (code) {
    const supabase = await createClient();

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardTo = new URL(next, origin);
      return NextResponse.redirect(forwardTo);
    }
  }

  // If there's an error or no code, send them to the error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
