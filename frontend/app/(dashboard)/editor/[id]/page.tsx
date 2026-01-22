// app/(dashboard)/editor/[id]/page.tsx should look like this:
import { createClient } from "@/lib/supabase/server";
import CreatorStudio from "@/components/studio/CreatorStudio";

export default async function EditorPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Also fetch the 'creators' profile to pre-fill the form
  const { data: profile } = await supabase
    .from("creators")
    .select("*")
    .eq("id", user?.id)
    .single();

  return <CreatorStudio user={user} profile={profile} />;
}
