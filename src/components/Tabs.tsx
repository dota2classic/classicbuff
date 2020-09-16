import styled from "styled-components";

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  color: #c2c2c2;
  margin: 10px;
`;

export const Tab = styled.div`
  position: relative;
  font-size: 16px;
  padding: 12px;
  cursor: pointer;

  display: flex;
  flex-direction: row;

  transition: 0.3s ease;

  ::before {
    content: "";
    background: rgba(102, 187, 255, 0.05);
    height: 2px;
    position: absolute;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease;
    left: 0;
    right: 0;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.6);
    &::before {
      content: "";
      background: rgba(102, 187, 255, 0.05);
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      opacity: 1;
      right: 0;
    }
  }

  &.interesting {
    color: rgba(44, 157, 246, 0.8);
    &:hover {
      color: rgba(44, 157, 246, 1);
    }
  }

  & * {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
  }

  &.active {
    ::before {
      content: "";
      background: rgb(102, 187, 255);
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;

      opacity: 1;
      right: 0;
    }
  }
`;
