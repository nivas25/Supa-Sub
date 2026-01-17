import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supa Sub - Monetize Your Content with 95% Revenue Share",
  description:
    "Build your digital storefront in minutes. Deploy autonomous bots for WhatsApp, Telegram & Discord. Keep 95% of every sale. No setup fees. Start earning today.",
  keywords:
    "creator platform, content monetization, digital storefront, subscription platform, WhatsApp bot, Telegram bot, Discord bot",
  authors: [{ name: "Supa Sub" }],
  creator: "Supa Sub",
  publisher: "Supa Sub",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://supasub.com",
    siteName: "Supa Sub",
    title: "Supa Sub - Monetize Your Content with 95% Revenue Share",
    description:
      "Build your digital storefront in minutes. Deploy autonomous bots for WhatsApp, Telegram & Discord. Keep 95% of every sale.",
    images: [
      {
        url: "https://supasub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Supa Sub - Creator Monetization Platform",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Supa Sub - Monetize Your Content with 95% Revenue Share",
    description:
      "Build your digital storefront in minutes. Keep 95% of every sale.",
    images: ["https://supasub.com/twitter-image.png"],
    creator: "@SupaSubHQ",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Supa Sub",
  },

  formatDetection: {
    telephone: false,
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "google-site-verification-code",
  },

  category: "Business",
  classification: "Creator Platform",
};

// JSON-LD Structured Data
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Supa Sub",
  url: "https://supasub.com",
  logo: "https://supasub.com/logo.png",
  description: "Creator monetization platform with 95% revenue share",
  sameAs: [
    "https://twitter.com/SupaSubHQ",
    "https://instagram.com/SupaSub",
    "https://linkedin.com/company/supa-sub",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "support@supasub.com",
  },
};
