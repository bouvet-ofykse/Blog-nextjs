import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // TODO: remove later
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    }
};

module.exports = {
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb',
        },
    },
}

export default nextConfig;
