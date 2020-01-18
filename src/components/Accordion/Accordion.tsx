import React, { ReactNode } from "react";
import styled from "styled-components";
import { Icon } from "../../assets";
import { colors } from "../shared/styles";

interface IAccordion {
  title: string;
  additional?: string;
  initialVisible?: boolean;
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
  transition: max-height 0.45s ease-out;
  transition-delay: -0.3s;
  height: auto;
  max-height: 0;

  &.visible {
    max-height: 3000px;
    transition: max-height 0.3s ease-in;
    transition-delay: 0s;
  }

  border-bottom: 1px solid ${colors.frame.stroke};
`;

class Accordion extends React.Component<IAccordion, { visible: boolean }> {
  state = {
    visible: !!this.props.initialVisible
  };

  render() {
    const { title, additional, children } = this.props;
    const { visible } = this.state;

    return (
      <StyledAccordion>
        <Header onClick={this.onToggle}>
          <HeaderText>{title}</HeaderText>
          {additional && <HeaderAdditional>{additional}</HeaderAdditional>}
          <Icon name={visible ? "expand-less" : "expand-more"} />
        </Header>
        <Content className={visible ? "visible" : ""}>{children}</Content>
      </StyledAccordion>
    );
  }

  onToggle = () => {
    this.setState(state => ({
      visible: !state.visible
    }));
  };
}

export default Accordion;
