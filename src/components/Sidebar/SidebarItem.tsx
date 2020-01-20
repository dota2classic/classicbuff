import React, { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Icon } from "../Icon";
import { colors } from "../shared/styles";

const StyledSidebarItem = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid ${colors.text.header};
`;

const Container = styled.a`
  display: flex;
  align-items: center;

  cursor: pointer;
  text-decoration: none;

  font-size: 14px;
  line-height: 16px;

  padding: 0 16px 0 20px;
  border-radius: 6px;

  height: 40px;

  transition: background-color 0.15s ease;

  &.active {
    background: #293e4c;
  }

  &:hover {
    background: #293e4c;
  }

  color: ${colors.common.background};
`;

const Title = styled.div`
  flex: 1;
`;

export interface ISidebarItem {
  title: string;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  active?: boolean;
  right?: ReactNode;
}

export const SidebarItem = (props: ISidebarItem) => (
  <StyledSidebarItem>
    <Link href={props.href}>
      <Container className={props.active ? "active" : ""}>
        <Title>{props.title}</Title>
        {props.right}
      </Container>
    </Link>
  </StyledSidebarItem>
);

const LogoutContainer = styled(Container)`
  font-size: 12px;
  line-height: 14px;

  padding-left: 10px;

  color: ${colors.text.secondary};
`;

export interface ISidebarLogout {
  email: string;
  onClick?: () => void;
}

export const SidebarLogout = (props: ISidebarLogout) => (
  <LogoutContainer onClick={props.onClick}>
    <Title>{props.email}</Title>
    <Icon name="exit" />
  </LogoutContainer>
);
