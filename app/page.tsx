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
                "@id": "https://openmail.domain.com/#webapp",
                "name": "Open Mail - Temporary Email Generator",
                "alternateName": ["Temp Mail", "Disposable Email", "10 Minute Mail"],
                "description": "Free temporary email generator that creates disposable email addresses for privacy protection and spam prevention.",
                "url": "https://openmail.domain.com",
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
                ]
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
                    "name": "Is temporary email free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Open Mail provides completely free temporary email addresses with no registration required and no hidden fees."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      
      <Navbar />
      <Main />
      <Testimonials />
      <Footer />
    </>
  );
}
