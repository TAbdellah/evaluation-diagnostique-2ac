import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? "/evaluation-diagnostique-2ac" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/evaluation-diagnostique-2ac" : "",
};

export default nextConfig;
