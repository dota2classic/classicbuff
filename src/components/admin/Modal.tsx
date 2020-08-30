import styled from "styled-components";
import React, { PropsWithChildren } from "react";

const ModalContainer = styled.div``;

interface Props<T> {
  onDone: () => void;
  store: T;
}

function Modal<T>(props: PropsWithChildren<Props<T>>) {
  return <ModalContainer></ModalContainer>;
}

export default Modal;
