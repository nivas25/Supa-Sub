import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PublicProfile from "@/components/public/PublicProfile";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Fetch Creator
  const { data: creator } = await supabase
    .from("creators")
    .select("*, profiles(*)")
    .eq("username", slug)
    .single();

  if (!creator) return notFound();

  // 2. Fetch Active Group
  const { data: groups } = await supabase
    .from("groups")
    .select("*")
    .eq("creator_id", creator.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1);

  const group = groups && groups.length > 0 ? groups[0] : null;

  // 3. GET REAL MEMBER COUNT (The Fix)
  let realMemberCount = 0;
  if (group) {
    const { count } = await supabase
      .from("memberships")
      .select("*", { count: "exact", head: true }) // <--- Counts actual rows
      .eq("group_id", group.id)
      .eq("status", "active");

    realMemberCount = count || 0;
  }

  // 4. CHECK IF YOU ARE A MEMBER
  let existingMembership = null;

  if (user && group) {
    const { data: members } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", user.id)
      .eq("group_id", group.id)
      .eq("status", "active")
      .limit(1);

    if (members && members.length > 0) {
      existingMembership = members[0];
    }
  }

  // 5. Prepare UI Data
  const platforms = {
    telegram: {
      enabled: group?.platform === "telegram",
      link: group?.telegram_link || "",
      title: "VIP Channel",
    },
    discord: {
      enabled: group?.platform === "discord",
      link: "",
      title: "Community Server",
    },
    whatsapp: {
      enabled: group?.platform === "whatsapp",
      link: "",
      title: "Member Group",
    },
  };

  return (
    <main>
      <PublicProfile
        name={creator.profiles.display_name}
        bio={creator.bio}
        price={group?.price?.toString() || "0"}
        handle={creator.username}
        memberCount={realMemberCount} // <--- Passing the real count
        avatarUrl={creator.profiles.avatar_url}
        bannerUrl={creator.banner_url} // <--- Pass the new banner from DB
        platforms={platforms}
        existingMembership={existingMembership}
        groupId={group?.id} // <--- NEW: Pass the Group ID for analytics
      />
    </main>
  );
}
