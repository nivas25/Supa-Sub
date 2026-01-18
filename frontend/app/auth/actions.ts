"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
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
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
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
    redirect("/dashboard");
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
