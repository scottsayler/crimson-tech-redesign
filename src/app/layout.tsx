import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { SiteGoogleAnalytics } from "@/components/analytics/SiteGoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata({
  title: site.name,
  description: site.description,
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}${site.logo}`,
  image: `${site.url}${site.ogImage}`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Downers Grove",
    addressRegion: "IL",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Scott Sayler",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SiteGoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
