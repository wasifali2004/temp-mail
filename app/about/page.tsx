"use client";

import React from "react";
import { Shield, Zap, Clock, Mail, Globe, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function AboutSection() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Generation",
      desc: "Create temporary emails in seconds",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy Protected",
      desc: "No registration required",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Auto-Expire",
      desc: "Emails delete automatically",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multiple Domains",
      desc: "Various domain options",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure",
      desc: "Your data stays private",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Real-time",
      desc: "Instant email delivery",
    },
  ];

  const faqs = [
    {
      q: "What is TempMailCo?",
      a: "TempMailCo is a free service that gives you temporary email addresses. Use them to sign up for websites, verify accounts, or test services without using your personal email.",
    },
    {
      q: "How long do emails last?",
      a: "Temporary emails last from 10 minutes to 30 minutes depending on your choice. They delete automatically after expiration.",
    },
    {
      q: "Is it free to use?",
      a: "Yes, completely free. No registration, no payment, no hidden costs.",
    },
    {
      q: "Why should I use a temporary email?",
      a: "Protect your inbox from spam, keep your identity private, and avoid unwanted newsletters when signing up for online services.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar/>
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About TempMailCo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted solution for temporary email addresses
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* What We Do */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We Do
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                TempMailCo provides disposable email addresses that protect your
                privacy online. When you need to sign up for a service, verify
                an account, or download a resource, use our temporary email
                instead of your real one.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                No registration needed. No personal information collected. Just
                instant, secure temporary emails that disappear after use.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Perfect for avoiding spam, protecting your identity, and keeping
                your main inbox clean.
              </p>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop"
                alt="Person working on laptop with email"
                className="w-full h-full object-cover"
                width={50}
                height={50}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20 bg-gray-50 rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Generate Email
              </h3>
              <p className="text-gray-600">
                Click to create a temporary email address instantly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Use It Anywhere
              </h3>
              <p className="text-gray-600">
                Sign up for websites, verify accounts, or receive confirmations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Auto Delete
              </h3>
              <p className="text-gray-600">
                Email expires automatically, no trace left behind
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="mb-20 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-10 border border-green-200">
          <div className="text-center max-w-3xl mx-auto">
            <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Privacy Matters
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We don`&apos;`t store your personal data, track your activity, or sell
              your information to anyone. Every temporary email is completely
              anonymous and deletes automatically. Your privacy is guaranteed.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <summary className="p-6 text-lg font-semibold text-gray-900 cursor-pointer">
                  {faq.q}
                </summary>
                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
           <Link href="/" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            <Mail className="w-5 h-5 mr-2" />
            Create Your Temporary Email
          </Link>
        </section>
      </main>
    </div>
  );
}