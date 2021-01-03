import * as React from "react";
import { Hint } from "./index";
import { withNextRouter } from "storybook-addon-next-router";

export default {
  title: "Hint",
  component: Hint
};

export const all = () => <Hint>I am hint</Hint>;
