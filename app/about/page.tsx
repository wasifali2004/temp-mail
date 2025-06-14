"use client"

import React from 'react';
import { Shield, Zap, Clock, Mail, Eye, Trash2, Globe, Lock, RefreshCw, Smartphone } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AboutSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Temporary Email Generation",
      description: "Create disposable email addresses in milliseconds with our lightning-fast temp mail infrastructure for immediate email verification",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Zero Registration Disposable Email",
      description: "No signup required for temporary email service. Complete anonymity guaranteed with our throwaway email generator",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Auto-Expire Temporary Emails",
      description: "Disposable emails automatically self-destruct after chosen time period. Perfect 10 minute mail solution for privacy protection",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Temporary Inbox",
      description: "Watch temporary emails arrive instantly with live updates. Best temp mail service for email verification and testing",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multiple Temp Mail Domains",
      description: "Choose from 50+ disposable email domains to bypass restrictions. Premium temporary email generator with domain variety",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Temporary Email App",
      description: "Perfect temp mail experience across all devices. Mobile-optimized disposable email service with PWA support",
      color: "from-rose-400 to-pink-500"
    }
  ];

  const stats = [
    { number: "10M+", label: "Temporary Emails Generated", icon: <Mail className="w-6 h-6" /> },
    { number: "50+", label: "Disposable Email Domains", icon: <Globe className="w-6 h-6" /> },
    { number: "99.9%", label: "Temp Mail Uptime", icon: <RefreshCw className="w-6 h-6" /> },
    { number: "0", label: "Personal Data Stored", icon: <Trash2 className="w-6 h-6" /> }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* SEO-optimized structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Open Mail - Free Temporary Email Generator",
            "description": "Learn about Open Mail's secure temporary email service. Free disposable email addresses with auto-deletion, zero registration, and complete privacy protection.",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Open Mail Temporary Email Generator",
              "applicationCategory": "Email Utility",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Instant temporary email generation",
                "Auto-expiring disposable emails",
                "Zero registration required",
                "Multiple temp mail domains",
                "Real-time email receiving",
                "Mobile-optimized temp mail service",
                "Complete privacy protection",
                "Spam-free temporary inbox"
              ]
            }
          })
        }}
      />
      
      <Navbar/>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO-optimized Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full mb-6 backdrop-blur-sm border border-white/10">
            <div className="flex items-center space-x-2 px-4 py-2">
              <Mail className="w-6 h-6 text-purple-400" />
              <span className="text-purple-300 font-medium">About Open Mail Temporary Email Service</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Free Temporary Email Generator
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Privacy Redefined
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Open Mail revolutionizes temporary email with cutting-edge disposable email technology, 
            unmatched privacy protection, and lightning-fast temp mail performance. Protect your real inbox 
            while staying connected with our secure throwaway email service and anonymous email generator.
          </p>
        </div>

        {/* SEO-optimized Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 hover:scale-105 hover:border-purple-400/30">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl text-purple-300 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO-optimized Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-500 hover:scale-105 hover:border-purple-400/30">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                </div>
                
                {/* SEO-optimized Content */}
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h2>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO-optimized Privacy Promise Section */}
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl">
                <Lock className="w-12 h-12 text-green-400" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-6">
              Secure Temporary Email Privacy Promise
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                At Open Mail, your privacy isn&apos;t just a feature—it&apos;s our foundation. Our disposable email service 
                doesn&apos;t store, track, or monetize your data. Every temporary email is automatically purged, leaving no digital 
                footprint behind. Experience the most secure temp mail generator with complete anonymity protection.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Zero Logging Temp Mail</h3>
                    <p className="text-gray-400 text-sm">No IP addresses, timestamps, or usage patterns recorded for complete temporary email anonymity</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Auto-Deletion Disposable Email</h3>
                    <p className="text-gray-400 text-sm">All temporary emails permanently deleted after expiration for ultimate privacy protection</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Open Source Temp Mail</h3>
                    <p className="text-gray-400 text-sm">Transparent temporary email code you can verify and trust for secure disposable email service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO-optimized Call to Action */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <Mail className="w-5 h-5 mr-2" />
            Generate Free Temporary Email Now
            <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</div>
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400/30 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-pink-400/30 rounded-full animate-bounce delay-300"></div>
    </section>
  );
}