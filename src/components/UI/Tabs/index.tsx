import styled from "styled-components";
import { colors } from "../../../shared";

export const Tab = styled.span`
  position: relative;
  font-size: 16px;
  padding: 12px;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  transition: 0.3s ease;

  user-select: none;
  color: ${colors.primaryText};

  &.primary {
    font-size: 22px !important;
  }

  &.secondary {
    font-size: 20px !important;
  }

  @media (max-width: 1200px) {
    padding: 3px !important;
  }

  & .badge {
    border-radius: 50%;
    color: ${colors.blueHighlight};
    background: ${colors.transparentTint};
    font-size: 12px;
    width: 16px;
    height: 16px;
    max-width: 16px;
    max-height: 16px;
    text-align: center;
    position: absolute;
    right: -5px;
    top: 5px;
  }

  &::before {
    content: "";
    background: ${colors.transparentTint};
    height: 2px;
    position: absolute;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease;
    left: 0;
    right: 0;
  }

  &:hover {
    color: ${colors.primaryTextHighlight};
    &::before {
      content: "";
      background: ${colors.transparentTint};
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      opacity: 1;
      right: 0;
    }
  }

  & * {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
  }

  &.accent {
    & ::before {
      content: "";
      background: ${colors.blueHighlight2};
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;

      opacity: 1;
      right: 0;
    }
  }
  &.active {
    &::before {
      content: "";
      background: ${colors.blueHighlight} !important;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;

      opacity: 1;
      right: 0;
    }
  }

  &.no-underline {
    &::before {
      content: none !important;
    }
  }

  &.disabled {
    color: ${colors.primaryTextDark};
    cursor: not-allowed;
  }
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;

  &.wide {
    width: 100%;
    flex: 1;
    & ${Tab} + ${Tab} {
      margin-left: 10px;
    }
  }

  &.heading ${Tab} {
    & .badge {
      width: 10px;
      height: 10px;
      right: -2px;
    }

    padding: 8px;
    font-size: 14px;
  }
`;
