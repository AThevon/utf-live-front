import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/layout/Footer";
import { LayoutGroup } from "framer-motion";
import IntroOverlay from "@/components/layout/IntroOverlay";
import { GoogleAnalytics  } from '@next/third-parties/google'

const fontSans = Geist({
  variable: "--font-custom-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontSecondary = Bebas_Neue({
  variable: "--font-custom-secondary",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const fontMono = Geist_Mono({
  variable: "--font-custom-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Under The Flow",
  description: "Under The Flow est un projet de live sessions musical.",
  appleWebApp: {
    title: 'UTF Live',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${fontSans.variable} ${fontSecondary.variable} ${fontMono.variable} dark font-sans text-foreground bg-background min-h-screen`}>
        <Providers>
        <LayoutGroup>
          <IntroOverlay />
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </LayoutGroup>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-V09HM6CECL" />
    </html>
  );
}
