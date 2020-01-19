import React from "react";
import Loader from "./Loader";
import LoaderBlock from "./LoaderBlock";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import LoadingNext from "./LoadingNext";

export default {
  title: "Design System/Loader",

  parameters: {
    component: Loader,
    subcomponents: { LoaderBlock, LoadingNext },
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

export const loadingNext = () => (
  <>
    <div style={{ width: 200, border: "1px solid gray" }}>
      <div style={{ width: 200, height: 200, border: "1px solid gray" }} />
      <LoadingNext hasNext={boolean("hasNext", true)} />
    </div>
  </>
);
