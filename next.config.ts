import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utf-live.s3.eu-west-3.amazonaws.com',
				pathname: '/**',
			},
		],
	},
  transpilePackages: ['three'],
};

export default nextConfig;
