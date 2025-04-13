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

    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Access-Control-Allow-Credentials',
                value: 'true'
              },
              {
                key: 'Access-Control-Allow-Origin',
                value: process.env.NEXT_PUBLIC_API_BASE_URL
              }
            ]
          }
        ]
    }
};

export default nextConfig;
