import React from "react";
import styled from "styled-components";

const IconSpan = styled.span`
  line-height: 0;
`;

const Icon = ({ icon, ...props }: { icon: string }) => {
  const svg = require(`!raw-loader!./svg/${icon}.svg`);
  return <IconSpan dangerouslySetInnerHTML={{ __html: svg.default }} />;
};

export const AddIcon = () => <Icon icon="add" />;
export const DownIcon = () => <Icon icon="sort-down" />;
export const LogoIcon = () => <Icon icon="logo" />;
export const FilterIcon = () => <Icon icon="filter" />;
export const PlayIcon = () => <Icon icon="play" />;
export const PauseIcon = () => <Icon icon="pause" />;
export const MessageIcon = () => <Icon icon="message" />;
export const CartIcon = () => <Icon icon="cart" />;
export const ExitIcon = () => <Icon icon="exit" />;
export const CloseIcon = () => <Icon icon="close" />;
export const MoreIcon = () => <Icon icon="more" />;
export const LessIcon = () => <Icon icon="less" />;
export const CalendarIcon = () => <Icon icon="calendar" />;
export const SearchIcon = () => <Icon icon="search" />;
export const DoneIcon = () => <Icon icon="done" />;
export const SortUpIcon = () => <Icon icon="sort-up" />;
export const SortDownIcon = () => <Icon icon="sort-down" />;
