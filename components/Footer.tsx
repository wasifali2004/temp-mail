import { Mail, Shield, Clock, Zap } from "lucide-react";

const Footer = () => {
  const durations = [
    "5 Minutes Temp Mail",
    "10 Minutes Temp Mail",
    "15 Minutes Temp Mail",
    "20 Minutes Temp Mail",
    "25 Minutes Temp Mail",
    "30 Minutes Temp Mail",
  ];

  const about = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/terms" },
  ];

  const shareText = "Check out TempMailco - Secure temporary email service!";
  const shareUrl = "https://tempmailco";

  const socials = [
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <footer className="bg-gray-50 text-gray-900 pt-5 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-gray-200">
          {/* Tagline */}
          <div className="flex-shrink-0">
            <h3 className="text-2xl font-bold mb-2">Stay Connected, Stay Private.</h3>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Weekly updates
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Customer support
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Secure and privacy
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                99.99% uptime
              </span>
            </div>
          </div>
        </div>

        {/* Main Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12">
          {/* Duration */}
          <div>
            <h4 className="font-semibold mb-4">Duration</h4>
            <ul className="space-y-2 text-sm">
              {durations.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              {about.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              {socials.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Mail className="w-5 h-5" />
            <span className="font-bold text-lg">TempMailco</span>
          </div>
          <p className="text-sm text-gray-600">© 2025 TempMailco</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;