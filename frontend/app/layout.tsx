import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Space_Grotesk, Outfit } from "next/font/google";
import { Providers } from "./providers";
import { clerkAppearance } from "@/lib/clerk-theme"; // Import from your new file

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
        <body className="antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
