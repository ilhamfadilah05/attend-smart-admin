/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "isomorphic-furyroad.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "benefis2.dev.ozip.co.id",
      },
      {
        protocol: "https",
        hostname: "digital-api.dompetdhuafa.org",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  transpilePackages: ["@isomorphic/core"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
