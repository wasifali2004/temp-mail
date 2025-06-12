"use client"
import React, { useState } from 'react';
import { MessageCircle, Send, Zap, Clock, Shield, Headphones, ArrowRight, Mail, MapPin } from 'lucide-react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

export default function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const whatsappNumber = "+923405245826";
  
  const handleWhatsAppRedirect = () => {
    const message = formData.name && formData.message 
      ? `Hi! I'm ${formData.name}. ${formData.message}`
      : "Hi! I have a question about Open Mail temporary email service.";
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const supportFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Response",
      description: "Get answers within minutes for temp mail issues",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Available",
      description: "Round-the-clock support for disposable email services",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Expert Support",
      description: "Temporary email technical issues resolved fast",
      color: "from-green-400 to-emerald-500"
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp Chat",
      subtitle: "Fastest way to get temp mail support",
      detail: "+92 340 5245826",
      action: handleWhatsAppRedirect,
      primary: true,
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      subtitle: "For detailed temporary email inquiries",
      detail: "support@openmail.com",
      action: () => window.location.href = "mailto:wasifali16103@gmail.com",
      color: "from-blue-500 to-indigo-600"
    },
  ];

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Open Mail - Temporary Email Support",
    "description": "Contact page for Open Mail temporary email service support",
    "url": "https://openmail.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Open Mail",
      "description": "Free temporary email service provider",
      "url": "https://openmail.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+923405245826",
          "contactType": "customer service",
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        },
        {
          "@type": "ContactPoint",
          "email": "support@openmail.com",
          "contactType": "customer service",
          "availableLanguage": "English",
          "areaServed": "Worldwide"
        }
      ],
      "sameAs": [
        "https://wa.me/923405245826"
      ]
    }
  };

  return (
    <>
      <Head>
        <title>Contact Open Mail - 24/7 Support for Temporary Email Service | Free Disposable Email</title>
        <meta name="description" content="Get instant support for Open Mail temporary email service. Contact us via WhatsApp for fast help with disposable emails, temp mail issues, and anonymous email solutions. Available 24/7." />
        <meta name="keywords" content="contact open mail, temp mail support, temporary email help, disposable email service, anonymous email support, fake email generator contact, 10 minute mail alternative" />
        <meta name="author" content="Open Mail Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://openmail.com/contact" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Contact Open Mail - 24/7 Temporary Email Support" />
        <meta property="og:description" content="Need help with temporary emails? Contact Open Mail support team via WhatsApp for instant assistance with disposable email services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://openmail.com/contact" />
        <meta property="og:site_name" content="Open Mail - Temporary Email Service" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Open Mail - Temp Mail Support" />
        <meta name="twitter:description" content="Get instant support for temporary email services. Available 24/7 via WhatsApp." />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        
        {/* Structured_elapsedTime */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main>
        <section className="relative py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
          <Navbar/>
          {/* Animated Background */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
            
            {/* Floating WhatsApp Icons */}
            <div className="absolute top-20 left-10 animate-bounce delay-300">
              <MessageCircle className="w-6 h-6 text-green-400/20" />
            </div>
            <div className="absolute top-40 right-20 animate-bounce delay-700">
              <Send className="w-5 h-5 text-blue-400/20" />
            </div>
            <div className="absolute bottom-32 left-1/4 animate-bounce delay-1000">
              <Headphones className="w-7 h-7 text-purple-400/20" />
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with SEO-optimized content */}
            <header className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full mb-6 backdrop-blur-sm border border-white/10">
                <div className="flex items-center space-x-2 px-4 py-2">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  <span className="text-green-300 font-medium">Contact Temp Mail Support</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Need Help with
                <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Temporary Email Service?
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Got questions about disposable emails? Need support with Open Mail temp mail service? Or having issues with anonymous email generation? We\'re here to help! 
                Reach out via WhatsApp for instant temporary email support or use any contact method below.
              </p>
            </header>

            {/* Support Features with SEO keywords */}
            <section className="grid md:grid-cols-3 gap-8 mb-16" aria-labelledby="support-features">
              <h2 id="support-features" className="sr-only">Open Mail Support Features</h2>
              {supportFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 hover:scale-105">
                    <div className="flex justify-center mb-4" aria-hidden="true">
                      <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                    </div>
                </article>
              ))}
            </section>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Methods with structured data */}
              <section className="space-y-6" aria-labelledby="contact-methods">
                <h2 id="contact-methods" className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Headphones className="w-8 h-8 mr-3 text-green-400" />
                  Contact Open Mail Support Team
                </h2>
                
                {contactMethods.map((method, index) => (
                  <article
                    key={method.title}
                    className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                      method.primary ? 'ring-2 ring-green-400/30' : ''
                    }`}
                    onClick={method.action}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && method.action()}
                    aria-label={`Contact via ${method.title}: ${method.detail}`}
                  >
                    <div className={`relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 ${
                      method.primary ? 'hover:border-green-400/50' : 'hover:border-blue-400/30'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-4 bg-gradient-to-br ${method.color} rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`} aria-hidden="true">
                          {method.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                                {method.title}
                              </h3>
                              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                {method.subtitle}
                              </p>
                              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300 mt-1">
                                {method.detail}
                              </p>
                            </div>
                            
                            <ArrowRight className={`w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 transform ${
                              hoveredCard === index ? 'translate-x-1' : ''
                            }`} aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                      
                      {method.primary && (
                        <div className="absolute -top-3 -right-3">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                            Recommended
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </section>

              {/* Quick Message Form with SEO optimization */}
              <section className="relative" aria-labelledby="quick-message">
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl mr-4" aria-hidden="true">
                      <Send className="w-6 h-6 text-green-400" />
                    </div>
                    <h2 id="quick-message" className="text-2xl font-bold text-white">Quick Temp Mail Support Message</h2>
                  </div>
                  
                  <p className="text-gray-400 mb-6">
                    Fill out the form below and we\'ll redirect you to WhatsApp with your temporary email support message ready to send!
                  </p>
                  
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleWhatsAppRedirect(); }}>
                    <div>
                      <label htmlFor="name" className="sr-only">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition-all duration-300"
                        autoComplete="name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="sr-only">Your Email (Optional)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email (Optional)"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/ Slater-10 rounded-x1 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition-all duration-300"
                        autoComplete="email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="sr-only">Your temporary email support message</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Describe your temp mail issue or question..."
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group"
                      aria-label="Send message via WhatsApp for temp mail support"
                    >
                      <div className="flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Send Temp Mail Support Message
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </button>
                  </form>
                </div>
              </section>
            </div>

            {/* Location & Hours with SEO enhancement */}
            <section className="mt-16 grid md:grid-cols-2 gap-8" aria-labelledby="additional-info">
              <h2 id="additional-info" className="sr-only">Additional Contact Information</h2>
              
              <article className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-400 mr-3" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-white">Open Mail Service Location</h3>
                </div>
                <p className="text-gray-400">
                  Pakistan (Serving worldwide temporary email users)
                </p>
              </article>
              
              <article className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-purple-400 mr-3" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-white">Temp Mail Support Response Time</h3>
                </div>
                <p className="text-gray-400">
                  WhatsApp: Within 5 minutes<br />
                  Email: Within 2 hours<br />
                  Available 24/7 for disposable email support
                </p>
              </article>
            </section>

            {/* FAQ Section for SEO */}
            <section className="mt-16" aria-labelledby="faq-section">
              <h2 id="faq-section" className="text-3xl font-bold text-white mb-8 text-center">
                Frequently Asked Questions - Temp Mail Support
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <article className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">How fast is Open Mail support response?</h3>
                  <p className="text-gray-400">We respond to WhatsApp messages within 5 minutes and emails within 2 hours for all temporary email service inquiries.</p>
                </article>
                
                <article className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">What temp mail issues can you help with?</h3>
                  <p className="text-gray-400">We help with disposable email problems, temporary email not receiving messages, anonymous email setup, and all Open Mail service issues.</p>
                </article>
                
                <article className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Is Open Mail temporary email service free?</h3>
                  <p className="text-gray-400">Yes, Open Mail provides free disposable email addresses with no registration required. Contact us for premium features information.</p>
                </article>
                
                <article className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Can you help with bulk temporary emails?</h3>
                  <p className="text-gray-400">Contact our support team via WhatsApp to discuss bulk disposable email solutions and enterprise temporary email services.</p>
                </article>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}