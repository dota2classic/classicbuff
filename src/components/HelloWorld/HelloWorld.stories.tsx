import React from "react";
import HelloWorld from "./HelloWorld";

export default {
  title: "Design System/Hello World",

  parameters: {
    component: HelloWorld
  }
};

export const simple = () => <HelloWorld hey="123" />;
