import { Metadata } from "next";
import LandingNavbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Supa Sub - Monetize Your Content with 95% Revenue Share",
  description:
    "Build your digital storefront in minutes. Deploy autonomous bots for WhatsApp, Telegram & Discord. Keep 95% of every sale. No setup fees. Start earning today.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      <main>{children}</main>
    </>
  );
}
