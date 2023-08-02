const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer({
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
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html"
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html"
    }
  },
  experimental: {
    appDir: true
  },
  compiler: {
    styledComponents: true
  }
});
