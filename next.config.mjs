/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/retailer",
        destination: "/retailer/product",
        permanent: true,
      },
      {
        source: "/",
        destination: "/ep",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
