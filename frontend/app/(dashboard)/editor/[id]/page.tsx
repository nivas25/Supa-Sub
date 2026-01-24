import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CreatorStudio from "@/components/studio/CreatorStudio";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  // 1. Check Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // 2. HANDLE "NEW" PAGE (The Fix)
  // We must return early here. If we let it continue, it will try to find
  // a page with ID "new" in the DB, fail, and redirect you.
  if (id === "new") {
    // We pass undefined so the component knows to start fresh
    return <CreatorStudio user={user} pageId={undefined} />;
  }

  // 3. Verify Ownership for Existing Pages
  const { data: page } = await supabase
    .from("pages")
    .select("owner_id")
    .eq("id", id)
    .single();

  // If page doesn't exist or user doesn't own it, kick them out
  if (!page || page.owner_id !== user.id) {
    redirect("/pages");
  }

  // 4. Render Editor in "Edit Mode"
  return <CreatorStudio user={user} pageId={id} />;
}
