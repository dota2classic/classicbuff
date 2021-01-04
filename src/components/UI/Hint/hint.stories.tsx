import * as React from "react";
import { Hint } from "./index";

export default {
  title: "UI/Hint",
  component: Hint
};

export const all = () => <Hint>I am hint</Hint>;

export const link = () => (
  <Hint className="link">
    I am with a <a>link</a> ;)
  </Hint>
);
