module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" }, // Prevents your site from being embedded in iframes
          { key: "X-Content-Type-Options", value: "nosniff" }, // Prevents browsers from misinterpreting file types
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // Controls referrer data for privacy
        ],
      },
    ];
  },
};