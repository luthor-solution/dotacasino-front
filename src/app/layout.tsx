"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import { ToastContainer } from "react-toastify";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AppShell from "@/components/AppShell";
import Footer from "@/components/common/Footer";
import "@/i18n/index";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ToastContainer />
        <Header />
        <NuqsAdapter>
          <AppShell>{children}</AppShell>
        </NuqsAdapter>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
