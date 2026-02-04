"use client";

import { useEffect } from "react";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Navbar from "../components/ui/Navbar1";
import Testimonials from "../components/Testimonial";
import TempMailCoTestimonials from "@/components/MailReviews";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function Home() {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    if (adsenseId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [adsenseId]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://tempmailco.com/#webpage",
                url: "https://tempmailco.com",
                name: "TempMailCo - Free Temporary Email Generator",
                description:
                  "Generate free temporary email addresses instantly with TempMailCo. Protect your privacy and avoid spam with our disposable email service.",
                datePublished: "2024-01-01T00:00:00+00:00",
                dateModified: "2025-08-06T00:00:00+00:00",
                isPartOf: {
                  "@id": "https://tempmailco.com/#website",
                },
                about: {
                  "@id": "https://tempmailco.com/#organization",
                },
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: "https://tempmailco.com/og-image.jpg",
                  width: 1200,
                  height: 630,
                },
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://tempmailco.com",
                    },
                  ],
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is TempMailCo and how does it work?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "TempMailCo is a free temporary email service that generates disposable email addresses that automatically expire after a set time period. Simply visit our website, get an instant temporary email address, and use it for registrations, verifications, or any service where you want to protect your real email from spam.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is TempMailCo completely free to use?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, TempMailCo provides completely free temporary email addresses with no registration required, no hidden fees, and no limitations on usage. Our service is supported by ads to keep it free for everyone.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How long do TempMailCo email addresses last?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "TempMailCo email addresses are automatically deleted after 10 minutes to several hours, depending on your selected settings. You can extend the time or refresh to get a new address anytime.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I use TempMailCo for account verification and sign-ups?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Absolutely! TempMailCo temporary emails work perfectly for account verification, newsletter subscriptions, downloading files, testing services, and any situation where you need an email address but want to protect your privacy.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is TempMailCo secure and private?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, TempMailCo prioritizes your privacy and security. We don't store personal information, emails are automatically deleted, and we use secure connections. However, remember that temporary emails should not be used for sensitive account recoveries or important services.",
                    },
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Use TempMailCo Free Temporary Email Generator",
                description:
                  "Step-by-step guide to generate and use temporary email addresses with TempMailCo",
                image: "https://tempmailco.com/how-to-guide.jpg",
                totalTime: "PT2M",
                estimatedCost: {
                  "@type": "MonetaryAmount",
                  currency: "USD",
                  value: "0",
                },
                step: [
                  {
                    "@type": "HowToStep",
                    name: "Visit TempMailCo Website",
                    text: "Go to tempmailco.com in your web browser",
                    url: "https://tempmailco.com",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Get Your Temporary Email",
                    text: "A random temporary email address will be automatically generated for you upon visiting the site",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Copy and Use",
                    text: "Copy the temporary email address and use it for registrations, verifications, or any service requiring an email",
                  },
                  {
                    "@type": "HowToStep",
                    name: "Receive Emails",
                    text: "Check back on TempMailCo to view any emails received in your temporary inbox",
                  },
                ],
              },
            ],
          }),
        }}
      />

      <Navbar />

      {/* Main content with sidebar ads */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-4 py-4">
          {/* Left Sidebar Ad */}
          {adsenseId && (
            <aside className="hidden lg:block w-[160px] flex-shrink-0 sticky top-20 self-start">
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: "160px", height: "600px" }}
                data-ad-client={adsenseId}
                data-ad-slot="5294812795"
              />
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Main />
          </main>

          {/* Right Sidebar Ad */}
          {adsenseId && (
            <aside className="hidden lg:block w-[160px] flex-shrink-0 sticky top-20 self-start">
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: "160px", height: "600px" }}
                data-ad-client={adsenseId}
                data-ad-slot="7258631154"
              />
            </aside>
          )}
        </div>
      </div>

      <Testimonials />

      <TempMailCoTestimonials/>

      {/* Horizontal Ad below Testimonials */}
      {adsenseId && (
        <section className="w-full flex justify-center py-4 bg-gray-50" aria-label="Advertisement">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minWidth: "320px", maxWidth: "728px", height: "90px" }}
            data-ad-client={adsenseId}
            data-ad-slot="9296238185"
            data-ad-format="horizontal"
          />
        </section>
      )}

      <Footer />
    </>
  );
}