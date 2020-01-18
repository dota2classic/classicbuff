import React, { FC } from "react";
import styled from "styled-components";
import { StyledInput } from "../Input/Input";
import Button from "../Button/Button";
import { CartIcon } from "../../assets";

const StyledHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  background: #dee7ed;

  ${StyledInput} {
    flex: 1;
  }
`;

const Header: FC = ({ children }) => <StyledHeader>{children}</StyledHeader>;

export const HeaderCart = () => <Button style="tertiary" iconLeft={<CartIcon />} text="40" />;

export default Header;
