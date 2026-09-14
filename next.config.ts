import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://api.uselogpulse.tech/api/:path*"
            : "http://localhost:3000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
