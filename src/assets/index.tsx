import React from "react";
import styled from "styled-components";

const IconWrapper = styled.span`
  line-height: 0;
`;

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

export const Icon = (props: IIcon) => {
  return <IconWrapper dangerouslySetInnerHTML={{ __html: loadIcon(props.name) }} onClick={props.onClick} />;
};

export const AddIcon = () => <Icon name="add" />;
export const DownIcon = () => <Icon name="sort-down" />;
export const LogoIcon = () => <Icon name="logo" />;
export const FilterIcon = () => <Icon name="filter" />;
export const PlayIcon = () => <Icon name="play" />;
export const PauseIcon = () => <Icon name="pause" />;
export const MessageIcon = () => <Icon name="message" />;
export const CartIcon = () => <Icon name="cart" />;
export const ExitIcon = () => <Icon name="exit" />;
export const CloseIcon = () => <Icon name="close" />;
export const MoreIcon = () => <Icon name="more" />;
export const LessIcon = () => <Icon name="less" />;
export const CalendarIcon = () => <Icon name="calendar" />;
export const SearchIcon = () => <Icon name="search" />;
export const DoneIcon = () => <Icon name="done" />;
export const SortUpIcon = () => <Icon name="sort-up" />;
export const SortDownIcon = () => <Icon name="sort-down" />;
