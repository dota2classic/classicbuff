import * as React from "react";
import Button from "components/Button/Button";
import { Icon } from "components/Icon";
import Divider from "components/Divider/Divider";
import TextInput from "components/forms/TextInput/TextInput";
import Header, { HeaderCart } from "components/Header/Header";

export const OfferRequestsHeader = () => {
  const [search, onChangeSearch] = React.useState<string>("");

  return (
    <Header>
      <Button type="primary" iconLeft={<Icon name="add" />} text="Создать запрос" />
      <Divider vertical />
      <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" value={search} onChange={onChangeSearch} />
      <Divider vertical />
      <HeaderCart />
    </Header>
  );
};

export default OfferRequestsHeader;
