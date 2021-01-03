const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/preset-typescript"],
  // Add nextjs preset
  presets: [path.resolve(__dirname, "./next-preset.js")]
};
