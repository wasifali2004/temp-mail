import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogs } from "@/components/data/blog"; // adjust path if needed

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Next.js dynamic route props
interface BlogDetailPageProps {
  params: Promise<Params>;
}

export default async function BlogDetail({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-96 bg-gray-900">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover opacity-80"
          width={1200} // set reasonable width
          height={600} // set reasonable height
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        <article className="bg-white">
          <time className="text-sm text-gray-500 block mb-3">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-600 pl-4 italic">
            {blog.shortDescription}
          </p>

          <div className="h-px bg-gray-200 mb-8" />

          <div className="prose prose-lg max-w-none">
            {blog.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="h-px bg-gray-200 mt-12 mb-8" />
        </article>
      </div>
    </main>
  );
}
