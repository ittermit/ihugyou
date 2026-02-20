import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnonymousProvider } from "@/components/AnonymousProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ihug.you | Send Digital Hugs",
  description: "A viral service to send digital hugs to your friends and loved ones.",
  openGraph: {
    title: "You've got a hug!",
    description: "Click to open your digital hug.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AnonymousProvider>
            {children}
          </AnonymousProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
