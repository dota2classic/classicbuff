import React, { ReactNode } from "react";
import styled from "styled-components";
import { StyledInput } from "../Input/Input";
import Button from "../Button/Button";
import { CartIcon } from "../../assets";
import { color } from "../shared/styles";

const StyledHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  background: #dee7ed;
  color: ${color.text.header};

  ${StyledInput} {
    flex: 1;
  }
`;

interface IHeader {
  children?: ReactNode;
}

const Header = ({ children }: IHeader) => <StyledHeader>{children}</StyledHeader>;

export const HeaderCart = () => <Button type="tertiary" iconLeft={<CartIcon />} text="40" />;

export default Header;
