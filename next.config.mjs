/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.api-sports.io',
                port: '',
                pathname: '/football/**',
            },
        ],
        minimumCacheTTL: 60 * 60 * 24,
    },
};

export default nextConfig;
