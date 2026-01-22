import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "tempmailco - Free Temporary Email Generator",
  description:
    "Generate instant temporary email addresses that auto-delete. Free disposable email service with no registration. Protect your privacy from spam with secure 10-minute mail generator.",
  keywords: [
    "temporary email",
    "disposable email",
    "temp mail",
    "10 minute mail",
    "fake email generator",
    "anonymous email",
    "privacy email",
    "secure temporary email",
    "free disposable email",
    "temporary email for registration",
    "tempmailco",
  ].join(", "),
  authors: [{ name: "tempmailco Team" }],
  creator: "tempmailco",
  publisher: "tempmailco",
  category: "Email Services",
  classification: "Temporary Email Generator",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tempmailco.com",
  },
  verification: {
    google: "googlee8fdf8c85f0b8a67",
    yandex: "0b738cf82ce9a36f",
    other: {
      "msvalidate.01": "0FE7B7A0DBD3EE68519290574A966E92",
    },
  },
  other: {
    "application-name": "tempmailco",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "theme-color": "#1a73e8",
    "color-scheme": "light",
  },
  icons: {
    icon: [{ url: "/logo3.png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        {/* CRITICAL: AdSense verification meta tag */}
        <meta name="google-adsense-account" content="ca-pub-1125717518172617" />
        
        {/* Load AdSense script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1125717518172617"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/logo3.png" />

        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="origin-when-cross-origin" />

        <meta
          property="og:title"
          content="tempmailco - Free Temporary Email Generator"
        />
        <meta
          property="og:description"
          content="Generate instant temporary email addresses that auto-delete. Protect your privacy with our secure disposable email service."
        />
        <meta property="og:url" content="https://tempmailco.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="tempmailco - Temporary Email Service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="tempmailco - Free Temporary Email Generator"
        />
        <meta
          name="twitter:description"
          content="Generate instant temporary email addresses that auto-delete. Protect your privacy with our secure disposable email service."
        />

        <script 
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "tempmailco",
              alternateName: [
                "Temp Mail",
                "Temporary Email",
                "Disposable Email",
                "10 Minute Mail",
              ],
              description:
                "Free temporary email generator for creating disposable email addresses that auto-delete for privacy protection.",
              url: "https://tempmailco.com",
              applicationCategory: "EmailApplication",
              operatingSystem: "Any",
              permissions: "none",
              isAccessibleForFree: true,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Instant temporary email generation",
                "Auto-expiring email addresses",
                "No registration required",
                "Spam and privacy protection",
                "Multiple domain options",
                "Real-time email receiving",
                "Mobile responsive interface",
                "Secure and encrypted",
              ],
              softwareVersion: "1.0.0",
              releaseNotes:
                "Initial release with temporary email generation, auto-delete functionality, and mobile support",
              publisher: {
                "@type": "Organization",
                "name": "tempmailco",
                "url": "https://tempmailco.com"
              },
            }),
          }}

          
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Ad Unit 1 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1125717518172617"
          data-ad-slot="5294812795"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        {/* Ad Unit 2 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1125717518172617"
          data-ad-slot="7258631154"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        {/* Ad Unit 3 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1125717518172617"
          data-ad-slot="9296238185"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        {/* Initialize all ads */}
        <Script id="adsense-init">
          {`
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({});
          `}
        </Script>

        {/* Your other scripts */}
        <Script
          id="eventsource-script"
          src="https://cdn.jsdelivr.net/gh/cemalgnlts/Mailjs@3.0.0/eventsource.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="mailjs-script"
          src="https://cdn.jsdelivr.net/npm/@cemalgnlts/mailjs@3.0.0/dist/mailjs.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="gtag-script"
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_TRACKING_ID"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}