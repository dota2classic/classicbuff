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

  &.active {
    ::before {
      content: "";
      background: rgb(102, 187, 255);
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`;
