import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsClickCapture } from "@/components/analytics/AnalyticsClickCapture";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { SiteGoogleAnalytics } from "@/components/analytics/SiteGoogleAnalytics";
import { SiteVercelAnalytics } from "@/components/analytics/SiteVercelAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { buildSiteGraph } from "@/lib/schema";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <JsonLd data={buildSiteGraph()} />
      </head>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AnalyticsClickCapture />
        <SiteVercelAnalytics />
        <SiteGoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
