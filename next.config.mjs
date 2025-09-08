/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'd1ei2xrl63k822.cloudfront.net',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'image.remaker.ai',
            },
        ],
    },
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
