/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
      const pathMap = {
        ...defaultPathMap,
      };
      delete pathMap['/verify/[token]'];
      return pathMap;
    },
  };
  
  export default nextConfig;