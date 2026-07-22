import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/solutions",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/solutions/:slug",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/insights/:slug",
        destination: "/research/:slug",
        permanent: true,
      },
      {
        source: "/tools",
        destination: "/decision-center",
        permanent: true,
      },
      {
        source: "/research",
        has: [{ type: "query", key: "type", value: "problem-page" }],
        destination: "/research/problems",
        permanent: true,
      },
      {
        source: "/research",
        has: [{ type: "query", key: "type", value: "technology-guide" }],
        destination: "/research/technology",
        permanent: true,
      },
      {
        source: "/research",
        has: [{ type: "query", key: "type", value: "buying-guide" }],
        destination: "/research/buying-guides",
        permanent: true,
      },
      {
        source: "/research",
        has: [{ type: "query", key: "type", value: "industry-guide" }],
        destination: "/research/industry-guides",
        permanent: true,
      },
      {
        source: "/research",
        has: [{ type: "query", key: "type", value: "vendor-comparison" }],
        destination: "/research/vendor-comparisons",
        permanent: true,
      },
      {
        source: "/research",
        has: [{ type: "query", key: "type", value: "decision-framework" }],
        destination: "/research/decision-frameworks",
        permanent: true,
      },
      {
        source: "/research",
        has: [{ type: "query", key: "type", value: "checklist" }],
        destination: "/research/checklists",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
