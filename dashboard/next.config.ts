import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Monorepo: allow reading parent repo (clients/, engineering/, etc.)
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
