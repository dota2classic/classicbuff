import React from "react";
import Header, { HeaderCart } from "./Header";
import Button from "../Button/Button";
import { Icon } from "../Icon";
import TextInput from "../forms/TextInput/TextInput";
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
      <Button type="primary" iconLeft={<Icon name="add" />} text="Создать запрос" />
      <Divider vertical />
      <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
      <Divider vertical />
      <HeaderCart />
    </Header>
  </>
);

export const Requests = () => (
  <Header>
    <Button type="primary" iconLeft={<Icon name="add" />} text="Создать запрос" />
    <Divider vertical />
    <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const RequestsPaused = () => (
  <Header>
    <Button type="primary" iconLeft={<Icon name="pause" />} text="Продолжить запрос" />
    <Divider vertical />
    <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const Proposals = () => (
  <Header>
    <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const NewRequestModal = () => (
  <Header>
    <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const RequestModal = () => (
  <Header>
    <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);

export const ProposalModal = () => (
  <Header>
    <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
    <Divider vertical />
    <HeaderCart />
  </Header>
);
