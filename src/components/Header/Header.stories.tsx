import React from "react";
import Header, { HeaderCart } from "./Header";
import Button from "../Button/Button";
import { AddIcon, PauseIcon } from "../../assets";
import Input from "../Input/Input";
import Divider from "../Divider/Divider";

export default {
  title: "Design System/Header",

  parameters: {
    component: Header
  }
};

export const all = () => (
  <>
    <Header>
      <Button type="primary" iconLeft={<AddIcon />} text="Создать запрос" />
      <Divider vertical />
      <Input placeholder="Номер запроса, клиент или ИНН, продукт" />
      <Divider vertical />
      <HeaderCart />
    </Header>
  </>
);

export const Requests = () => (
  <Header>
    <Button type="primary" iconLeft={<AddIcon />} text="Создать запрос" />
    <Divider vertical />
    <Input placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const RequestsPaused = () => (
  <Header>
    <Button type="primary" iconLeft={<PauseIcon />} text="Продолжить запрос" />
    <Divider vertical />
    <Input placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const Proposals = () => (
  <Header>
    <Input placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const NewRequestModal = () => (
  <Header>
    <Input placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const RequestModal = () => (
  <Header>
    <Input placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const ProposalModal = () => (
  <Header>
    <Input placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);
