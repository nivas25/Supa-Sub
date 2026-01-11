import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local"; // Clash is best as a local font or high-end sans

// If you want a Google equivalent that is NOT average, use "Outfit"
import { Outfit } from "next/font/google";
import { Providers } from "./providers";

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
