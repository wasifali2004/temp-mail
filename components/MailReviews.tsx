import Image from "next/image";
import React from "react";

interface Testimonial {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bgColor: string;
  content: string;
  hashtags: string[];
  date: string;
  replies: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Thompson",
    username: "@alexcodes",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    bgColor: "bg-blue-500",
    content:
      "TempMailCo has been a game-changer for my workflow. No more spam cluttering my primary inbox. The interface is intuitive and the email forwarding feature works flawlessly!",
    hashtags: ["#ProductivityHack", "#TechTools"],
    date: "Nov 2, 2025",
    replies: 23,
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    username: "@mariadev",
    avatar: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid&w=740&q=80",
    bgColor: "bg-purple-500",
    content:
      "As a developer, I appreciate TempMailCo's clean API and custom domain support. Perfect for testing user flows without creating fake accounts. Highly recommended!",
    hashtags: ["#DevLife", "#WebDev"],
    date: "Oct 28, 2025",
    replies: 31,
  },
  {
    id: 3,
    name: "James Wilson",
    username: "@jameswilson",
    avatar: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    bgColor: "bg-green-500",
    content:
      "I've tried several temp mail services, but TempMailCo stands out. Fast, reliable, and the emails arrive instantly. Great for online shopping and newsletter signups.",
    hashtags: ["#SmartShopping", "#Privacy"],
    date: "Oct 25, 2025",
    replies: 18,
  },
  {
    id: 4,
    name: "Sophie Anderson",
    username: "@sophietech",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    bgColor: "bg-pink-500",
    content:
      "The best temporary email solution I've found! TempMailCo keeps my real inbox secure while I test new services. The custom domain feature is absolutely brilliant.",
    hashtags: ["#EmailPrivacy", "#SecureEmail"],
    date: "Oct 20, 2025",
    replies: 27,
  },
  {
    id: 5,
    name: "David Park",
    username: "@davidcreates",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    bgColor: "bg-orange-500",
    content:
      "Clean, simple, and effective. TempMailCo does exactly what it promises. No complicated setup, just instant temporary emails. Perfect for avoiding spam!",
    hashtags: ["#NoSpam", "#TechSolutions"],
    date: "Oct 15, 2025",
    replies: 15,
  },
  {
    id: 6,
    name: "Emma Foster",
    username: "@emmainbytes",
    avatar: "https://wallpapers.com/images/high/anime-profile-picture-jioug7q8n43yhlwn.jpg",
    bgColor: "bg-indigo-500",
    content:
      "Been using TempMailCo for months now and it's hands down the most reliable temp mail service. The email retention period is perfect for my needs!",
    hashtags: ["#TechLife", "#PrivacyFirst"],
    date: "Oct 12, 2025",
    replies: 42,
  },
  {
    id: 7,
    name: "Ryan Mitchell",
    username: "@ryanbuilds",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s",
    bgColor: "bg-teal-500",
    content:
      "TempMailCo's integration capabilities are outstanding. I use it for all my QA testing and it saves me hours every week. Couldn't work without it now!",
    hashtags: ["#QATesting", "#DevTools"],
    date: "Oct 8, 2025",
    replies: 36,
  },
  {
    id: 8,
    name: "Lisa Chang",
    username: "@lisadigital",
    avatar: "https://t3.ftcdn.net/jpg/15/34/03/58/360_F_1534035806_6gn57ou4V0dVZY6l30h6nEB5gWQRAP6v.jpg",
    bgColor: "bg-rose-500",
    content:
      "Finally, a temp mail service that actually works! No delays, no missing emails. TempMailCo is now my go-to for all temporary email needs. Absolutely love it!",
    hashtags: ["#DigitalLife", "#EmailSecurity"],
    date: "Oct 5, 2025",
    replies: 29,
  },
];

export default function TempMailCoTestimonials() {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Loved by Thousands of Users
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what people are saying about TempMailCo on social media
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`${testimonial.bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm `}
                  >
                    <Image
                      src={testimonial.avatar}
                      alt="profile image"
                      width={50}
                      height={50}
                      className="w-12 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {testimonial.username}
                    </p>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>

              {/* Content */}
              <p className="text-gray-700 text-xs leading-relaxed mb-3">
                {testimonial.content}
              </p>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {testimonial.hashtags.map((tag, index) => (
                  <span key={index} className="text-blue-600 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-gray-500 text-xs mb-2">{testimonial.date}</p>
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-xs">0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-xs">{testimonial.replies}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
