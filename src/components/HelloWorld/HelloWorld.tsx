import React, { FC } from "react";
import styled from "styled-components";

const Content = styled.h2`
  color: green;
`;

export interface IHelloWorld {
  hey: string;
}

const HelloWorld: FC<IHelloWorld> = (props: IHelloWorld) => <Content>Hello World {props.hey}</Content>;

export default HelloWorld;
