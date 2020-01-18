import React from "react";
import Button from "../Button/Button";
import { SortDownIcon, SortUpIcon } from "../../assets";
import styled from "styled-components";

interface IToolbarSortBy {
  fields: {
    key: string;
    label: string;
    directional: "uni" | "bi";
  }[];
  value?: { field: string; direction?: "asc" | "desc" };
  onChange?: (value: { field: string; direction: "asc" | "desc" }) => void;
}

const icons = {
  asc: <SortDownIcon />,
  desc: <SortUpIcon />
};

const StyledToolbarSortBy = styled.div`
  display: inline-flex;
  align-items: center;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  * + * {
    margin-left: 10px;
  }
`;

const ToolbarSortBy = (props: IToolbarSortBy) => {
  const value = props.value || { field: props.fields[0].key, direction: "asc" };

  return (
    <StyledToolbarSortBy>
      <div>Упорядочить:</div>
      {props.fields.map(({ key, label, directional }) => (
        <Button
          key={key}
          text={label}
          type={key == value.field ? "secondary" : "tertiary"}
          iconRight={key === value.field && directional === "bi" ? icons[value.direction!!] : undefined}
        />
      ))}
    </StyledToolbarSortBy>
  );
};

export default ToolbarSortBy;
