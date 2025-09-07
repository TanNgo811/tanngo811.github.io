import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallbacks for Node.js modules in the browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        child_process: false,
        http2: false,
        os: false,
        net: false,
        tls: false,
        dns: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
        querystring: false,
        punycode: false,
      };
    }

    return config;
  },
};

export default nextConfig;
