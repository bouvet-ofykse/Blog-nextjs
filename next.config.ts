/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static-cdn.jtvnw.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
