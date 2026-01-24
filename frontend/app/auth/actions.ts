"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * SOCIAL LOGIN
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

/**
 * OTP LOGIN
 */
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
    return { error: "Invalid code" };
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

// ==========================================
// PROFILE ACTIONS
// ==========================================

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, email, avatar_url, created_at")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data;
}

export async function updateProfile(formData: {
  firstName: string;
  lastName: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: formData.firstName,
      last_name: formData.lastName,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/profile");
  return { success: true };
}

// ==========================================
// AUTH HELPERS (Fixed Missing Export)
// ==========================================

/**
 * Returns the raw Auth User object (lighter than getProfile)
 * Used by Layouts to check login status quickly.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}
