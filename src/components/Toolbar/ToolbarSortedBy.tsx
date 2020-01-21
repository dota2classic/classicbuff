import React from "react";
import styled from "styled-components";
import { Entity, Field } from "service/models";
import Button from "../Button/Button";
import { Icon } from "../Icon";
import { OrderDescriptor } from "../../service/OrderStore";
import { Order } from "../../service/Repository";

interface IToolbarSortBy<T extends Entity> {
  data: OrderDescriptor<T>[];
  value: Order<T>;
  onChange: (value: Order<T>) => void;
}

const icons = {
  asc: <Icon name="sort-down" />,
  desc: <Icon name="sort-up" />
};

const StyledToolbarSortBy = styled.div`
  display: inline-flex;
  align-items: center;

  * + * {
    margin-left: 10px;
  }
`;

class ToolbarSortBy<T extends Entity> extends React.Component<IToolbarSortBy<T>> {
  render() {
    const value = this.props.value || { field: "", direction: undefined };

    return (
      <StyledToolbarSortBy>
        <div>Упорядочить:</div>
        {this.props.data
          .map(it => ({ ...it, active: it.field === value.field }))
          .map(it => (
            <Button
              key={it.field as string}
              text={it.label}
              type={it.active ? "secondary" : "tertiary"}
              iconRight={it.active && it.directional === "bi" && icons[value.direction!!]}
              onClick={() => this.onClick(it.field)}
            />
          ))}
      </StyledToolbarSortBy>
    );
  }

  onClick = (field: Field<T>) => {
    const { data, value, onChange } = this.props;

    const item = data.find(it => it.field === field);

    if (!onChange || !item) return;
    const isBiDirection = item.directional === "bi";

    if (!value) {
      if (isBiDirection) {
        onChange({ field, direction: "asc" });
      } else {
        onChange({ field });
      }
      return;
    }

    const isActive = value.field === field;

    if (isActive) {
      if (isBiDirection) {
        onChange({ field, direction: value.direction === "asc" ? "desc" : "asc" });
      }
    } else {
      if (isBiDirection) {
        onChange({ field, direction: "asc" });
      } else {
        onChange({ field });
      }
    }
  };
}

export default ToolbarSortBy;
