import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../shared/styles";
import { SidebarLogout } from "./SidebarItem";
import { Icon } from "../Icon";

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  background: ${colors.common.menu};

  padding: 10px 10px;
`;

const SidebarLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 10px;
  margin-bottom: 40px;
`;

const SidebarContainer = styled.div`
  flex: 1;

  margin-bottom: 40px;
`;

interface ISidebar {
  email: string;
  onLogout?: () => void;
  children?: ReactNode;
}

const Sidebar = (props: ISidebar) => (
  <StyledSidebar>
    <SidebarLogo>
      <Icon name="logo" />
    </SidebarLogo>
    <SidebarContainer>{props.children}</SidebarContainer>
    <SidebarLogout email={props.email} onClick={props.onLogout} />
  </StyledSidebar>
);

export * from "./SidebarItem";
export default Sidebar;
