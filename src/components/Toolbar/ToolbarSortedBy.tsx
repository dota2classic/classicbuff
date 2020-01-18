import React from "react";
import Button from "../Button/Button";
import { SortDownIcon, SortUpIcon } from "../../assets";

interface IToolbarSortBy {
  fields: { [key: string]: string };
  value?: { field: string; direction: "asc" | "desc" };
  onChange?: (value: { field: string; direction: "asc" | "desc" }) => void;
}

const icons = {
  asc: <SortDownIcon />,
  desc: <SortUpIcon />
};

const ToolbarSortBy = (props: IToolbarSortBy) => {
  const value = props.value || { field: Object.keys(props.fields)[0], direction: "asc" };

  return (
    <div>
      <span>Упорядочить: </span>
      {Object.keys(props.fields).map(key => (
        <Button
          key={key}
          text={props.fields[key]}
          type={key == value.field ? "secondary" : "tertiary"}
          iconRight={key == value.field && icons[value.direction]}
        />
      ))}
    </div>
  );
};

export default ToolbarSortBy;
