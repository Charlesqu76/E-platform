/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

  async redirects() {
    return [
      {
        source: "/retailer",
        destination: "/retailer/portrait",
        permanent: false,
      },
      {
        source: "/",
        destination: "/ep",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
