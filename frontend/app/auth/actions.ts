"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Handles Social Login (Google)
 * Updated to accept a dynamic redirect path
 */
export async function signInWithSocial(
  provider: "google",
  nextPath: string = "/pages",
) {
  const supabase = await createClient();
  let authUrl: string | null = null;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // Dynamically set the redirect URL based on where they clicked "Join"
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });
    if (error) throw error;
    authUrl = data.url;
  } catch (error) {
    console.error("Auth error:", error);
    return { error: "Failed to connect to Google" };
  }

  if (authUrl) redirect(authUrl);
}

// ... (Rest of file: sendOTP, verifyOTP, signOut can stay the same for now)
// Note: Email OTP will still default to /pages unless we update verifyOTP too,
// but Google is the primary flow for guests.

export async function sendOTP(email: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/pages`,
      },
    });
    return { success: !error, error: error?.message };
  } catch (err) {
    return { success: false, error: "Check your email connection" };
  }
}

export async function verifyOTP(email: string, token: string) {
  const supabase = await createClient();
  let isSuccessful = false;

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) throw error;
    if (data.session) isSuccessful = true;
  } catch (error) {
    return { error: "Invalid or expired code" };
  }

  if (isSuccessful) {
    revalidatePath("/", "layout");
    redirect("/pages");
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Returns the currently authenticated user (server-side)
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("getCurrentUser error:", error.message);
    return null;
  }

  return user;
}
