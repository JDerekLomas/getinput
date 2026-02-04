import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getinput.io"),
  title: "getinput - The human in your loop",
  description: "AI makes mistakes. Humans catch them. Click to edit text, swipe through images, review AI outputs. The feedback layer for Claude Code.",
  openGraph: {
    title: "getinput - The human in your loop",
    description: "AI makes mistakes. Humans catch them. The feedback layer for Claude Code.",
    images: ["/illustrations/hero-1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "getinput - The human in your loop",
    description: "AI makes mistakes. Humans catch them. The feedback layer for Claude Code.",
    images: ["/illustrations/hero-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
