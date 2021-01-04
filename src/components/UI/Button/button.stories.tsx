import Button, { LinkButton } from "./index";
import React from "react";

export default {
  title: "UI/Button",
  component: Button
};

export const normal = () => (
  <>
    <Button>I am button</Button>
    <Button disabled>I am disabled button</Button>
  </>
);
export const small = () => (
  <>
    <Button className="small">I am small button</Button>
    <Button disabled className="small">
      I am small disabled button
    </Button>
  </>
);

export const linkVariant = () => (
  <>
    <LinkButton>I am link button</LinkButton>
    <LinkButton className="small">I am small link button</LinkButton>
  </>
);
