import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Script from 'next/script'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Mail",
  
  description: "Generate instant temporary email addresses that auto-delete. Free disposable email service with no registration. Protect your privacy from spam with secure 10-minute mail generator.",
  
  keywords: [
    // Primary high-volume keywords
    "temporary email", "temp mail", "disposable email", "10 minute mail", "fake email generator",
    "throwaway email", "temporary email generator", "disposable email service", "temp email generator",
    
    // Competitor-based keywords  
    "guerrilla mail", "mailinator", "tempmail", "yopmail", "maildrop", "guerrillamail alternative",
    "mailinator alternative", "tempmail alternative", "10minutemail", "temp-mail",
    
    // Feature-specific keywords
    "anonymous email", "privacy email", "spam protection email", "secure temporary email",
    "email verification", "signup email", "burner email", "email alias", "fake email address",
    
    // Use-case keywords
    "temporary email for registration", "disposable email for signup", "fake email for testing",
    "temporary email for verification", "throwaway email for downloads", "temp email for trials",
    "anonymous email for privacy", "disposable email for shopping", "fake email for forums",
    
    // Long-tail commercial keywords
    "free temporary email service", "best disposable email generator", "secure temp mail service",
    "temporary email no registration required", "instant disposable email address",
    "free throwaway email generator", "anonymous email service online", "privacy email generator free",
    
    // Technical keywords
    "self destructing email", "auto delete email", "ephemeral email", "temporary inbox",
    "disposable inbox", "virtual email address", "email forwarding service", "temp email api",
    
    // Location-based keywords for international reach
    "temporary email usa", "temp mail europe", "disposable email worldwide", "global temp mail",
    
    // Mobile and device keywords
    "temporary email mobile", "temp mail app", "disposable email android", "temp email ios",
    
    // Time-based keywords
    "1 hour email", "30 minute email", "24 hour email", "temporary email 1 day",
    "short term email", "quick email generator", "instant email address",
    
    // Security and privacy keywords
    "encrypted temporary email", "secure disposable email", "private temp mail",
    "anonymous disposable email", "untraceable email", "email privacy protection",
    
    // Professional use keywords
    "temporary email for business", "disposable email for developers", "temp mail for testing",
    "qa email testing", "email automation testing", "developer temp email",
    
    // Comparison keywords
    "temp mail vs real email", "disposable vs permanent email", "temporary email benefits",
    "why use disposable email", "temp mail advantages", "fake email pros and cons"
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // alternates: {
  //   canonical: 'https://openmail.domain.com', // Replace with your actual domain
  // },
  
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  //   yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  //   other: {
  //     'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
  //   },
  // },
  
  other: {
    'google-adsense-account': 'ca-pub-XXXXXXXXXX', // Add if you use AdSense
    'application-name': 'Open Mail',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'theme-color': '#1a73e8', // Replace with your brand color
    'color-scheme': 'light',
  },
  
  // icons: {
  //   icon: [
  //     { url: '/logo3.png' },
  //     { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  //     { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  //   ],
  //   apple: [
  //     { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  //   ],
  //   other: [
  //     { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1a73e8' },
  //   ],
  // },
  
  manifest: '/site.webmanifest',
};

// Export viewport separately (required in newer Next.js versions)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="icon" href="/logo3.png" />
        
        {/* Additional meta tags for better indexing */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Structured data for enhanced SERP features */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Open Mail",
              "alternateName": ["Temp Mail", "Temporary Email", "Disposable Email", "10 Minute Mail"],
              "description": "Free temporary email generator for creating disposable email addresses that auto-delete for privacy protection.",
              "url": "https://openmail.domain.com",
              "applicationCategory": "EmailApplication",
              "operatingSystem": "Any",
              "permissions": "none",
              "isAccessibleForFree": true,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Instant temporary email generation",
                "Auto-expiring email addresses", 
                "No registration required",
                "Spam and privacy protection",
                "Multiple domain options",
                "Real-time email receiving",
                "Mobile responsive interface",
                "Secure and encrypted"
              ],
              "screenshot": "https://openmail.domain.com/screenshot.png",
              "softwareVersion": "1.0",
              "releaseNotes": "Initial release with core temporary email functionality"
            })
          }}
        />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Load external scripts with performance optimization */}
        <Script 
          src="https://cdn.jsdelivr.net/gh/cemalgnlts/Mailjs@3.0.0/eventsource.min.js" 
          strategy="afterInteractive"
        />
        <Script 
          src="https://cdn.jsdelivr.net/npm/@cemalgnlts/mailjs@3.0.0/dist/mailjs.min.js" 
          strategy="afterInteractive"
        />
        
        {/* Google Analytics - Add your GA4 tracking ID */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script> */}
      </body>
    </html>
  );
}