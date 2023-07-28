const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer({
  target: "serverless",

  i18n: {
    locales: ["en-us", "ru-ru"],
    defaultLocale: "ru-ru"
  },
  env: {
    API_URL: process.env.API_URL || "http://localhost:3000",
    WS_URL: process.env.WS_URL || "http://localhost:3000",
    DEV: process.env.DEV || "false"
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
  }
});
