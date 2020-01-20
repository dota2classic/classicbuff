import React from "react";
import styled from "styled-components";

type IconName =
  | "add"
  | "calendar"
  | "cart"
  | "close"
  | "done"
  | "exit"
  | "expand-less"
  | "expand-more"
  | "filter"
  | "filter-active"
  | "less"
  | "logo"
  | "message"
  | "more"
  | "pause"
  | "play"
  | "search"
  | "sort-down"
  | "sort-up";

interface IIcon {
  name: IconName;
  onClick?: () => void;
}

const loadIcon = (name: IconName): string => {
  return require(`!raw-loader!./svg/${name}.svg`).default;
};

export const iconUrlData = (name: IconName): string => {
  return loadIcon(name).replace(/fill="#/g, 'fill="%23');
};

const IconWrapper = styled.span`
  line-height: 0;
`;

export const Icon = (props: IIcon) => (
  <IconWrapper dangerouslySetInnerHTML={{ __html: loadIcon(props.name) }} onClick={props.onClick} />
);
