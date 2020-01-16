import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

addParameters({
  options: {
    showRoots: true
  }
});

addDecorator(withA11y);

// automatically import all files ending in *.stories.tsx
configure(
  [require.context("../src", true, /\.stories\.mdx$/), require.context("../src", true, /\.stories\.tsx$/)],
  module
);
