"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Helper: Calculate the Expiry Date
function calculateExpiry(interval: string): string | null {
  const now = new Date();

  if (interval === "weekly") {
    now.setDate(now.getDate() + 7);
  } else if (interval === "monthly") {
    now.setMonth(now.getMonth() + 1);
  } else if (interval === "yearly") {
    now.setFullYear(now.getFullYear() + 1);
  } else if (interval === "lifetime") {
    return null; // Null means "Forever"
  } else {
    // Default fallback (e.g. 30 days) if interval is unknown
    now.setMonth(now.getMonth() + 1);
  }

  return now.toISOString();
}

export async function joinCommunity(
  slug: string,
  amount: number,
  interval: string,
) {
  const supabase = await createClient();

  // 1. Get Current User
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Please log in first" };
  }

  // 2. Find the Page
  const { data: page } = await supabase
    .from("pages")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!page) return { error: "Page not found" };

  // 3. Calculate Expiry
  const expiresAt = calculateExpiry(interval);

  // 4. Create Membership
  const { error } = await supabase.from("memberships").insert({
    user_id: user.id,
    page_id: page.id,
    status: "active",
    amount_paid: amount,
    expires_at: expiresAt, // <--- NOW IT HAS A DATE
  });

  if (error) {
    console.error("Join Error:", error);
    return { error: "Failed to join. You might already be a member." };
  }

  // 5. Refresh
  revalidatePath(`/${slug}`);
  return { success: true };
}
