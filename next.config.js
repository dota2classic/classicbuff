const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer");

module.exports = {
  i18n: {
    locales: ["en-us", "ru-ru"],
    defaultLocale: "ru-ru"
  },

  images: {
    domains: ["steamcdn-a.akamaihd.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steamcdn-a.akamaihd.net",
        port: "",
        pathname: "/apps/dota2/images/items/**"
      }
    ]
  },

  webpack(config, options) {
    config.resolve = config.resolve || {};
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new TsConfigPathsPlugin({
        configFile: "./tsconfig.json"
      })
    );

    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });

    return config;
  },
  experimental: {
    appDir: true,
    fallbackNodePolyfills: false
  },
  compiler: {
    styledComponents: true
  }
}
