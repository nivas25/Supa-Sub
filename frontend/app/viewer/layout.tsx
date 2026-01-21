import ViewerNavbar from "@/components/nav/ViewerNavbar";
import { getCurrentUser } from "@/app/auth/actions";

export default async function ViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <ViewerNavbar
        displayName={user?.user_metadata?.full_name}
        avatarUrl={user?.user_metadata?.avatar_url}
      />
      {children}
    </>
  );
}
