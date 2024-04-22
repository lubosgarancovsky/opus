/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: [
    {
      key: "Access-Control-Allow-Origin",
      value: process.env.NEXTAUTH_URL,
    },
  ],
};

export default nextConfig;
