// import withBundleAnalyzer from '@next/bundle-analyzer';
// import withPWA from 'next-pwa';

// /** @type {import('next').NextConfig} */
// const nextConfig = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',  // Enable bundle analysis
// })(
//   withPWA({
//     pwa: {
//       dest: 'public',  // Directory where the PWA assets will be stored
//       disable: process.env.NODE_ENV === 'development',  // Disable PWA in development
//     },
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'thetradecorebucket.s3.eu-west-2.amazonaws.com',
//           pathname: '/**', // Allow all paths for this domain
//         },
//       ],
//       domains: ['thetradecorebucket.s3.eu-west-2.amazonaws.com'],
//     },
//   })
// );

// export default nextConfig;


import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Enable bundle analysis
})(
  withPWA({
    pwa: {
      dest: 'public', // Directory where the PWA assets will be stored
      disable: process.env.NODE_ENV === 'development', // Disable PWA in development
    },
  })
);

export default {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thetradecorebucket.s3.eu-west-2.amazonaws.com',
        pathname: '/**', // Allow all paths for this domain
      },
    ],
    domains: ['thetradecorebucket.s3.eu-west-2.amazonaws.com'], // Allow images from this domain
  },
};
