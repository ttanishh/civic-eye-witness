
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Allow Next.js to handle solidity files
    config.module.rules.push({
      test: /\.sol$/,
      use: 'raw-loader',
    });
    
    return config;
  },
};

export default nextConfig;
