"use server";
import { createClient } from "@/lib/supabase/server";

export async function registerView(groupId: string) {
  const supabase = await createClient();

  // Call the SQL function we just created
  await supabase.rpc("increment_views", { group_id: groupId });
}
