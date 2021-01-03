import { withNextRouter } from "storybook-addon-next-router";
import { StorybookContainer } from "../src/components/util/storybook-container";
import React from "react";
import { addDecorator } from "@storybook/react";

addDecorator(withNextRouter());

addDecorator(getStory => <StorybookContainer theme={{ primaryColor: "darkorange" }}>{getStory()}</StorybookContainer>);
