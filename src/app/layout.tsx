import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnonymousProvider } from "@/components/AnonymousProvider";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

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
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5J097FHJYT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5J097FHJYT');
          `}
        </Script>
      </head>
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
