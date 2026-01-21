import "./globals.css";
import { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://supasub.com"),
  title: {
    default: "Supa Sub - Monetize Your Content with 95% Revenue Share",
    template: "%s | Supa Sub",
  },
  description:
    "Build your digital storefront in minutes. Deploy autonomous bots for WhatsApp, Telegram & Discord. Keep 95% of every sale.",
  keywords: [
    "creator platform",
    "content monetization",
    "subscription platform",
    "WhatsApp bot",
  ],
  authors: [{ name: "Supa Sub" }],
  creator: "Supa Sub",
  robots: {
    index: true,
    follow: true,
  },
};

// UPDATED: Added all weights so "Normal" text actually works
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
