"use server";
import { createClient } from "@/lib/supabase/server";

export async function registerView(pageId: string) {
  if (!pageId) return;

  const supabase = await createClient();

  // Call the SQL function we just created
  const { error } = await supabase.rpc("increment_page_view", {
    page_id: pageId,
  });

  if (error) {
    console.error("Failed to register view:", error);
  }
}
