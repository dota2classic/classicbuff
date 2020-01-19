import React, { ReactNode } from "react";
import styled from "styled-components";
import { Icon } from "../../assets";
import { colors } from "../shared/styles";

interface IAccordion {
  title: string;
  additional?: string | number;
  initialCollapsed?: boolean;
  onChangeCollapsed?: (value: boolean) => void;
  children?: ReactNode;
}

const StyledAccordion = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  cursor: pointer;

  color: ${colors.text.header};

  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderText = styled.div`
  flex: 1;
`;

const HeaderAdditional = styled.div`
  margin: 0 5px;
`;

const Content = styled.div`
  overflow: hidden;
  height: auto;

  max-height: 3000px;
  transition: max-height 0.3s ease-in;
  transition-delay: 0s;

  &.collapsed {
    transition: max-height 0.45s ease-out;
    transition-delay: -0.3s;
    max-height: 0;
  }

  border-bottom: 1px solid ${colors.frame.stroke};
`;

class Accordion extends React.Component<IAccordion, { collapsed: boolean }> {
  state = {
    collapsed: !!this.props.initialCollapsed
  };

  render() {
    const { title, additional, children } = this.props;
    const { collapsed } = this.state;

    return (
      <StyledAccordion>
        <Header onClick={this.onToggle}>
          <HeaderText>{title}</HeaderText>
          {additional && <HeaderAdditional>{additional}</HeaderAdditional>}
          <Icon name={collapsed ? "expand-more" : "expand-less"} />
        </Header>
        <Content className={collapsed ? "collapsed" : ""}>{children}</Content>
      </StyledAccordion>
    );
  }

  onToggle = () => {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
    this.props.onChangeCollapsed && this.props.onChangeCollapsed(collapsed);
  };
}

export default Accordion;
