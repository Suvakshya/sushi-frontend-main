// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//     domains: ['res.cloudinary.com'],
//   },
//   output: "standalone"
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  output: "standalone",
  experimental: {
    appDir: true,
  },
};

export default nextConfig;

