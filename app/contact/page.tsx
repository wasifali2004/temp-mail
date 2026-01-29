"use client";
import { useState } from "react";
import Navbar1 from "@/components/ui/Navbar1";
import Footer from "@/components/Footer";
import { MapPin, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("idle");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar1 />

      <main className="min-h-screen bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">

          {/* LEFT SIDE INFO */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
            <p className="text-gray-600 mb-8">
              Have questions or need support? Reach out to us — we usually reply within a few hours.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                <p className="text-gray-700">Worldwide • Online Support</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="font-medium mb-3">Follow us</p>
              <div className="flex gap-4 text-gray-600">
                <a href="#" className="hover:text-black transition">X</a>
                <a href="#" className="hover:text-black transition">FB</a>
                <a href="#" className="hover:text-black transition">YouTube</a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write your message..."
              />
            </div>

            {status === "success" && (
              <p className="text-green-600 mb-3 text-sm">✅ Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 mb-3 text-sm">❌ Failed to send. Try again.</p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
