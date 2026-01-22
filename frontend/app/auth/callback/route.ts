import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // FIX: The path is just '/pages' or '/coupons', not '/dashboard/...'
  const next = searchParams.get("next") ?? "/pages";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Clean redirect to the correct dashboard page
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Login failed
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
