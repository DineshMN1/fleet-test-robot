// app/layout.tsx

import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/styles/globals.css"; // Global styles for your project

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SLAM Fleet Dashboard", // Title for your project
  description: "Autonomous SLAM-Based Fleet for Smart Agricultural Supervision",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
