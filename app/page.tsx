"use client"

import Footer from "../components/Footer";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonial";

export default function Home() {
  return (
    <>
      {/* Advanced Schema.org structured data for better SERP features */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://tempmailco.com/#webapp",
                "name": "TempMailCo - Temporary Email Generator",
                "alternateName": ["Temp Mail", "Disposable Email", "10 Minute Mail", "TempMail Co"],
                "description": "Free temporary email generator by TempMailCo that creates disposable email addresses for privacy protection and spam prevention.",
                "url": "https://tempmailco.com",
                "applicationCategory": "Email Utility",
                "operatingSystem": ["Windows", "macOS", "Linux", "iOS", "Android"],
                "browserRequirements": "Requires JavaScript",
                "permissions": "No permissions required",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                "featureList": [
                  "Instant email generation",
                  "Auto-expiring emails", 
                  "No registration required",
                  "Spam protection",
                  "Multiple domain options",
                  "Email forwarding"
                ],
                "provider": {
                  "@type": "Organization",
                  "name": "TempMailCo",
                  "url": "https://tempmailco.com"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://tempmailco.com/#organization",
                "name": "TempMailCo",
                "url": "https://tempmailco.com",
                "description": "Leading provider of temporary email services for privacy protection and spam prevention.",
                "foundingDate": "2024",
                "knowsAbout": [
                  "Temporary Email",
                  "Email Privacy",
                  "Spam Protection",
                  "Disposable Email Addresses"
                ],
                "sameAs": []
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a temporary email address?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A temporary email address is a disposable email that automatically expires after a set time period, typically 10 minutes to 1 hour, protecting your real email from spam."
                    }
                  },
                  {
                    "@type": "Question", 
                    "name": "Is TempMailCo free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, TempMailCo provides completely free temporary email addresses with no registration required and no hidden fees."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long do TempMailCo email addresses last?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "TempMailCo email addresses are automatically deleted after a specified time period, typically ranging from 10 minutes to several hours, depending on your selected settings."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I use TempMailCo for account verification?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, TempMailCo temporary emails can be used for account verification, newsletter subscriptions, and any service that requires email confirmation while keeping your real email private."
                    }
                  }
                ]
              },
              {
                "@type": "WebPage",
                "@id": "https://tempmailco.com/#webpage",
                "url": "https://tempmailco.com",
                "name": "TempMailCo - Free Temporary Email Generator",
                "description": "Generate free temporary email addresses instantly with TempMailCo. Protect your privacy and avoid spam with our disposable email service.",
                "isPartOf": {
                  "@id": "https://tempmailco.com/#website"
                },
                "about": {
                  "@id": "https://tempmailco.com/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://tempmailco.com/og-image.jpg"
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://tempmailco.com/#website",
                "url": "https://tempmailco.com",
                "name": "TempMailCo",
                "description": "Free temporary email generator for privacy protection",
                "publisher": {
                  "@id": "https://tempmailco.com/#organization"
                },
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://tempmailco.com/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ]
              }
            ]
          })
        }}
      />
      
      <Navbar />
      
      {/* Top Ad - After Navigation */}
      <div className="w-full flex justify-center py-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1125717518172617"
          data-ad-slot="5294812795"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      
      <Main />
      
      {/* Middle Ad - Between Main and Testimonials */}
      <div className="w-full flex justify-center py-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1125717518172617"
          data-ad-slot="7258631154"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      
      <Testimonials />
      
      {/* Bottom Ad - Before Footer */}
      <div className="w-full flex justify-center py-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1125717518172617"
          data-ad-slot="9296238185"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      
      <Footer />
    </>
  );
}