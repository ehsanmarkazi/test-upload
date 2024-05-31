/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "test-upload-theta-ten.vercel.app/upload",
         
          "localhost",
  
        ],
      },
      experimental: { esmExternals: true, serverActions: true },
};

export default nextConfig;
