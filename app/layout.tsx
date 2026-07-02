import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/site-data";

const fraunces = Fraunces({ variable: "--font-display", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: `${SITE_NAME} | Grease Trap, Hood & Drain Cleaning`, template: `%s | ${SITE_NAME}` },
  description: "Commercial grease trap cleaning, hood cleaning, catch basin maintenance, and hydro jetting for restaurants and properties across Canada.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Grease Trap, Hood & Drain Cleaning`,
    description: "Professional commercial grease trap, hood, and drain cleaning services across Canada. Same-day response available.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
