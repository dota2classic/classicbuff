import Input from "./index";
import React from "react";

export default {
  title: "UI/Input",
  component: Input
};

export const normal = () => (
  <>
    <Input className="iso" value="I am isolated input with no margin at bottom" />
    <Input value={"I am casual input"} />
    <Input className="small" value="I am small input :)" />
  </>
);
