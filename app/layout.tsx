import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://analytics.itonga.dev"),
  title: "RepairOps Intelligence Dashboard | Itonga Analytics Demo",
  description:
    "A live business intelligence dashboard demo for a repair business, built by Itonga to show revenue, profit, repair jobs, customer records, technician performance, invoices, and business insights.",
  keywords: [
    "Itonga",
    "RepairOps",
    "repair business dashboard",
    "business intelligence dashboard",
    "analytics dashboard",
    "service business dashboard",
    "repair shop dashboard",
    "Next.js dashboard",
    "Recharts dashboard",
    "data analytics demo",
    "small business analytics",
  ],
  authors: [{ name: "Amos Omondi" }],
  creator: "Amos Omondi",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "RepairOps Intelligence Dashboard",
    description:
      "A live analytics dashboard demo for a repair business, showing revenue, repair jobs, customers, invoices, technician performance, and operational insights.",
    url: "https://analytics.itonga.dev",
    siteName: "Itonga Analytics Demo",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepairOps Intelligence Dashboard",
    description:
      "A live business intelligence dashboard demo for a repair business, built by Itonga.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}