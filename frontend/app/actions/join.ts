"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function joinCommunity(creatorHandle: string, price: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. GUEST CHECK: If not logged in, send to new Login Page
  if (!user) {
    return {
      error: "not_authenticated",
      // Pass the current page as the 'next' destination
      redirectUrl: `/auth/login?next=/${creatorHandle}`,
    };
  }

  // 2. Fetch Creator & Group
  const { data: creator } = await supabase
    .from("creators")
    .select("id, groups(*)")
    .eq("username", creatorHandle)
    .single();

  if (!creator || !creator.groups[0]) return { error: "Group not found" };
  const group = creator.groups[0];

  // 3. Upsert Membership (Mock Payment)
  const { data: membership, error: memberError } = await supabase
    .from("memberships")
    .upsert({
      user_id: user.id,
      group_id: group.id,
      status: "active",
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      amount_paid: price,
    })
    .select()
    .single();

  if (memberError) return { error: "Failed to create membership" };

  // 4. Generate Invite Code
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();

  await supabase.from("invite_codes").insert({
    code: code,
    membership_id: membership.id,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });

  // 5. Success
  redirect(`/thank-you/${code}`);
}
