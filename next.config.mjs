/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts"],
    };
    return config;
  },
  images: {
    /** Whitelisted domains for optimized image loading
     *  @next/image
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: "/ipfs/**",
      },
    ],
  },
};

export default nextConfig;
