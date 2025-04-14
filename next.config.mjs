/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'byewhile.ru',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
