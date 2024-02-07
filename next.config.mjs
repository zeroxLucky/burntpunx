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
        hostname: "api.universalprofile.cloud",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
