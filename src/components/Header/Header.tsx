import React, { ReactNode } from "react";
import styled from "styled-components";
import { StyledTextInput } from "../forms/TextInput/TextInput";
import Button from "../Button/Button";
import { CartIcon } from "../../assets";
import { colors } from "../shared/styles";

const StyledHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  background: #dee7ed;
  color: ${colors.text.header};

  ${StyledTextInput} {
    flex: 1;
  }
`;

interface IHeader {
  children?: ReactNode;
}

const Header = ({ children }: IHeader) => <StyledHeader>{children}</StyledHeader>;

export const HeaderCart = () => <Button type="tertiary" iconLeft={<CartIcon />} text="40" />;

export default Header;
