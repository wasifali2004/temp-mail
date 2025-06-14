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
  title: "Open Mail - Free Temporary Email Generator",
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
  ].join(", "),
  authors: [{ name: "Open Mail Team" }],
  creator: "Open Mail",
  publisher: "Open Mail",
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
    canonical: "https://your-actual-domain.com", // Replace with your actual domain
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Replace with your Google Search Console code
    yandex: "YOUR_YANDEX_VERIFICATION_CODE", // Replace with your Yandex Webmaster code
    other: {
      "msvalidate.01": "YOUR_BING_VERIFICATION_CODE", // Replace with your Bing Webmaster code
    },
  },
  other: {
    "google-adsense-account": process.env.GOOGLE_ADSENSE_ACCOUNT || "ca-pub-YOUR_ACTUAL_PUBLISHER_ID", // Fallback to placeholder if env not set
    "application-name": "Open Mail",
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
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="lazyOnload"
          data-ad-client={process.env.GOOGLE_ADSENSE_ACCOUNT || "ca-pub-YOUR_ACTUAL_PUBLISHER_ID"} // Fallback to placeholder if env not set
          async
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
          content="Open Mail - Free Temporary Email Generator"
        />
        <meta
          property="og:description"
          content="Generate instant temporary email addresses that auto-delete. Protect your privacy with our secure disposable email service."
        />
        <meta property="og:url" content="https://your-actual-domain.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Open Mail - Free Temporary Email Generator"
        />
        <meta
          name="twitter:description"
          content="Generate instant temporary email addresses that auto-delete. Protect your privacy with our secure disposable email service."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Open Mail",
              alternateName: [
                "Temp Mail",
                "Temporary Email",
                "Disposable Email",
                "10 Minute Mail",
              ],
              description:
                "Free temporary email generator for creating disposable email addresses that auto-delete for privacy protection.",
              url: "https://your-actual-domain.com",
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
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.GOOGLE_ADSENSE_ACCOUNT || "ca-pub-YOUR_ACTUAL_PUBLISHER_ID"} // Fallback to placeholder if env not set
          data-ad-slot="5294812795"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1125717518172617"
          crossOrigin="anonymous"
        />
        <Script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.GOOGLE_ADSENSE_ACCOUNT || "ca-pub-YOUR_ACTUAL_PUBLISHER_ID"} // Fallback to placeholder if env not set
          data-ad-slot="7258631154"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1125717518172617"
          crossOrigin="anonymous"
        ></script>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.GOOGLE_ADSENSE_ACCOUNT || "ca-pub-YOUR_ACTUAL_PUBLISHER_ID"} // Fallback to placeholder if env not set
          data-ad-slot="9296238185"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1125717518172617"
          crossOrigin="anonymous"
        ></script>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

        <Script
          src="https://cdn.jsdelivr.net/gh/cemalgnlts/Mailjs@3.0.0/eventsource.min.js"
          strategy="afterInteractive"
          integrity="sha384-YOUR_SRI_HASH_EVENTSOURCE" // Replace with actual SRI hash
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@cemalgnlts/mailjs@3.0.0/dist/mailjs.min.js"
          strategy="afterInteractive"
          integrity="sha384-YOUR_SRI_HASH_MAILJS" // Replace with actual SRI hash
          crossOrigin="anonymous"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_TRACKING_ID" // Replace with your Google Analytics tracking ID
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}