import React from "react";
import Link from "next/link";
import { blogs } from "../../components/data/blog"; // ✅ update path
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogListing() {
  return (
    <>
      <Navbar />

      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Latest Blog Posts
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about temporary emails, privacy, and online security
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <time className="text-xs text-gray-500 mb-2">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                      {blog.shortDescription}
                    </p>

                    <span className="flex items-center text-blue-600 text-sm font-semibold">
                      Read More
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
