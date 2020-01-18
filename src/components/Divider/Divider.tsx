import React from "react";
import styled from "styled-components";

interface IDivider {
  vertical?: boolean;
}

const VerticalDivider = styled.span`
  background: #bdcfdb;

  &.vertical {
    width: 1px;
    margin: 2px 20px;
  }
`;

const Divider = (props: IDivider) => <VerticalDivider className={props.vertical ? "vertical" : "horizontal"} />;

export default Divider;
