import React from "react";
import Loader from "./Loader";
import LoaderBlock from "./LoaderBlock";
import { boolean, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Design System/Loader",

  parameters: {
    component: Loader,
    subcomponents: { LoaderBlock },
    decorators: [withKnobs]
  }
};

export const all = () => (
  <>
    <Loader />
  </>
);

export const loaderBlock = () => (
  <>
    <LoaderBlock loading={boolean("loading", true)}>
      <div style={{ width: 200, height: 200, border: "1px solid gray" }} />
    </LoaderBlock>
  </>
);
