/* eslint-disable no-undef */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.pokemon.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    prependData:
      ["variables", "animations", "mixins", "breakpoints"]
        .map((fileName) => `@import "styles/${fileName}.scss";`)
        .join("\n") + "\n\n",
  },
};

module.exports = nextConfig;
