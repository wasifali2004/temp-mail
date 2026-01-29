import { useState } from "react";
import { ChevronRight, Twitter, Facebook, Mail } from "lucide-react";

export default function TempMailBlog() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const shareButtons = [
    { name: "Twitter", Icon: Twitter, color: "bg-blue-400" },
    { name: "Facebook", Icon: Facebook, color: "bg-blue-600" },
    { name: "Email", Icon: Mail, color: "bg-yellow-400" }
  ];

  const relatedLinks = [
    "Spam protection software", "10-minute mail", "Secure email application",
    "Email", "Email privacy tools", "Email testing service", "Email verification tool",
    "Two factor authentication methods", "Privacy focused search engines",
    "Encrypted email service", "Temporary email service"
  ];

  const relatedTopics = [
    "Temporary Email Inbox",
    "Temporary Email with Password",
    "Create Disposable Email Address",
    "Free Disposable Email Address",
    "Disposable Email Address"
  ];

  const faqs = [
    {
      q: "What's a temp mail and how does it work?",
      a: "Temp mail is a temporary email address that you can use for a short time. It works just like regular email but expires after some time."
    },
    {
      q: "Where can I use a temp mail?",
      a: "You can use temp mail for website registrations, online services, downloading content, or anywhere you don't want to share your real email."
    },
    {
      q: "How to use disposable email?",
      a: "Simply visit tempmailco, copy the generated email address, and use it wherever you need. All emails will appear on the page automatically."
    },
    {
      q: "How long do we keep your mail messages?",
      a: "Mail messages are kept from a few minutes up to a few days, depending on the service settings."
    }
  ];

  const articles = [
    { title: "3 simple tips to keep your email inbox from filling up with spam", icon: "👤" },
    { title: "Where, who and how to use temp mail?", icon: "📧" },
    { title: "Temporary Email or Disposable Email Service", icon: "📝" }
  ];

  return (
    <div className="bg-white">
      {/* Share Buttons */}
      <div className="flex justify-center gap-3 py-6">
        {shareButtons.map((btn) => {
          const IconComponent = btn.Icon;
          return (
            <button key={btn.name} className={`${btn.color} w-12 h-12 flex items-center justify-center text-white rounded hover:opacity-90 transition-opacity`}>
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-12">
        {/* Main Content */}
        <h1 className="text-3xl font-bold mb-4">Why do we need a temp mail address?</h1>
        
        <p className="text-gray-700 mb-3 leading-relaxed">
          Many websites ask for your email when you sign up or want to see special content. But some of these sites might send you unwanted emails or spam. <a href="#" className="text-blue-600">Spam protection software</a>
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          The best solution is to use a temporary email address when you&apos;re not sure if a website can be trusted. This keeps your real inbox clean and protects your privacy.
        </p>

        {/* Discover More Links */}
        <div className="mb-6">
          <span className="text-gray-600 mr-3">Discover more</span>
          <div className="inline-flex flex-wrap gap-2">
            {relatedLinks.map((link, i) => (
              <a key={i} href="#" className="text-blue-600 hover:underline">ⓘ {link}</a>
            ))}
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Disposable mail (also called temp mail, temporary mail, or 10-minute mail) works like regular email but with a few differences:
        </p>

        <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
          <li>It only lasts for a short time - from a few minutes to a few days. (Tempmailco keeps old emails for up to 2 days)</li>
          <li>You can only receive emails. You cannot send emails using a temp mail service.</li>
          <li>Only text and HTML messages work. File attachments are blocked to keep you safe from dangerous files and viruses.</li>
        </ol>

        <h2 className="text-2xl font-bold mb-3">There are a few basic cases where you need temporary mail</h2>

        <ul className="space-y-3 mb-6">
          <li className="text-gray-700">
            • Developers can test if email features work properly. With tempmailco, test emails are ready instantly. Our API will be available soon to make testing even easier.
          </li>
          <li className="text-gray-700">
            • Keep your information safe from suspicious websites and protect your email from spam. Using temporary emails means you don&apos;t have to worry anymore. Privacy matters to everyone now. Temporary email addresses help protect you from risks.
          </li>
        </ul>

        {/* Discover Related Topics */}
        <div className="border border-gray-200 rounded mb-6">
          <h3 className="text-lg font-semibold p-4 bg-gray-50">Discover related topics</h3>
          <div className="divide-y divide-gray-200">
            {relatedTopics.map((topic, i) => (
              <a key={i} href="#" className="flex items-center justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-700">{topic}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        <ul className="space-y-2 mb-4 text-gray-700">
          <li>• For websites that aren&apos;t important to you.</li>
          <li>• Mailing lists or forums for getting subscription-only content.</li>
          <li>• On websites you don&apos;t trust.</li>
          <li>• Signing up for social media - Facebook, Instagram, Twitter, etc.</li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-600 font-semibold">ⓘ Secure email application</p>
          <p className="text-gray-600 mt-2">💡 <strong>Note:</strong> Never use disposable email for important things. It only lasts a short time and your email address is temporary.</p>
        </div>

        {/* FAQ Section */}
        <h2 className="text-3xl font-bold mb-4">FAQ</h2>
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200 mb-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50">
                <span className="font-medium text-gray-800">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${activeFaq === i ? "rotate-90" : ""}`} />
              </button>
              {activeFaq === i && (
                <div className="pb-4 px-4 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {articles.map((article, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-3xl">{article.icon}</span>
              </div>
              <div className="text-base font-medium mb-1">{i + 1}</div>
              <h3 className="text-gray-800 text-sm">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}