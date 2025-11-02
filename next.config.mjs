/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/bibirajnischool' : '',
  assetPrefix: isGithubActions ? '/bibirajnischool/' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
