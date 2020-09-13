import ReactModal from "react-modal";
import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default (props: any) => {
  return (
    <ReactModal isOpen>
      <Content></Content>
      <Button onClick={props.hide}>Отмена</Button>
    </ReactModal>
  );
};
