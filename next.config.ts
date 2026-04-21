import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
     

      {
        protocol: 'https',
        hostname: 'deploy-pos-nestjs-bzdc.onrender.com',       

      },
      
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

module.exports = nextConfig




        
       