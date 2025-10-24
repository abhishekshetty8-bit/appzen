import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/TopNav";
import NotificationsBridge from "@/components/NotificationsBridge";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AppZen Inbox — Supplier Hub Demo",
  description: "AI-powered Supplier Operations Automation demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}> 
        <Providers>
          <div className="flex flex-col min-h-screen">
            <TopNav />
            <main className="flex-1">
              <div className="max-w-7xl mx-auto p-4 lg:p-6">{children}</div>
            </main>
          </div>
          <NotificationsBridge />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
