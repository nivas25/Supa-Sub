"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { User } from "@supabase/supabase-js";

/**
 * Handles Social Login (Google)
 */
export async function signInWithSocial(provider: "google") {
  const supabase = await createClient();
  let authUrl: string | null = null;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // CHANGED: Added ?next=/pages to ensure it goes to the right place
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/pages`,
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

/**
 * Sends a 6-digit OTP code to the email
 */
export async function sendOTP(email: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // CHANGED: Added ?next=/pages
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/pages`,
      },
    });
    return { success: !error, error: error?.message };
  } catch (err) {
    return { success: false, error: "Check your email connection" };
  }
}

/**
 * Verifies the 6-digit OTP code
 */
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
    // CHANGED: Redirect to /pages instead of /home
    redirect("/pages");
  }
}

/**
 * The Missing Sign Out Function
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Returns the currently authenticated user (server-side)
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("getCurrentUser error:", error.message);
    return null;
  }
  return data.user ?? null;
}
