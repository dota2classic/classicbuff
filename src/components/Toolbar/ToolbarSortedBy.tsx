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
  onChange?: (value: { field: string; direction?: "asc" | "desc" }) => void;
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

class ToolbarSortBy extends React.Component<IToolbarSortBy> {
  render() {
    const value = this.props.value || { field: this.props.fields[0].key, direction: "asc" };

    return (
      <StyledToolbarSortBy>
        <div>Упорядочить:</div>
        {this.props.fields.map(({ key, label, directional }) => (
          <Button
            key={key}
            text={label}
            type={key === value.field ? "secondary" : "tertiary"}
            iconRight={key === value.field && directional === "bi" ? icons[value.direction!!] : undefined}
            onClick={() => this.onClick(key)}
          />
        ))}
      </StyledToolbarSortBy>
    );
  }

  onClick = (key: string) => {
    const { fields, value, onChange } = this.props;

    const field = fields.find(it => it.key === key);

    if (!value || !onChange || !field) return;

    const isActive = value.field === key;
    const isBiDirection = field.directional === "bi";

    if (isActive) {
      if (isBiDirection) {
        onChange({ field: key, direction: value.direction === "asc" ? "desc" : "asc" });
      }
    } else {
      if (isBiDirection) {
        onChange({ field: key, direction: "asc" });
      } else {
        onChange({ field: key });
      }
    }
  };
}

export default ToolbarSortBy;
