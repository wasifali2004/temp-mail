import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TempMailCo - Free Temporary Email Generator",
  description: "Generate instant temporary email addresses that auto-delete. Protect your privacy with our secure disposable email service.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-76C99GDV6W" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-76C99GDV6W');
          `}
        </Script>

        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-1125717518172617" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1125717518172617"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/logo3.png" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* MailJS Scripts (Keep as requested) */}
        <Script
          src="https://cdn.jsdelivr.net/gh/cemalgnlts/Mailjs@3.0.0/eventsource.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@cemalgnlts/mailjs@3.0.0/dist/mailjs.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
