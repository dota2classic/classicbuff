import React from "react";
import styled from "styled-components";
import SearchInput from "../../forms/SearchInput/SearchInput";
import Checkbox from "../../forms/Checkbox/Checkbox";
import Button from "../../Button/Button";
import { IFinderItem } from "./Finder";

interface IFinderView {
  data: IFinderItem[];
  searchResult: IFinderItem[];

  query: string;
  onChangeQuery: (query: string) => void;

  expand: boolean;
  onToggleExpand: () => void;

  checked: { [key: string]: string };
  onChangeChecked: (data: IFinderItem, checked: boolean) => void;
}

const Content = styled.div`
  margin: 8px 0;

  & > * {
    margin-bottom: 4px;
  }

  &.expand {
    max-height: 320px;
    overflow-y: scroll;
  }
`;

const FinderView = (props: IFinderView) => (
  <>
    <SearchInput placeholder="Наименование..." value={props.query} onChange={props.onChangeQuery} />

    <Content className={props.expand ? "expand" : ""}>
      {(props.expand ? props.searchResult : props.data).map(it => (
        <Checkbox
          key={it.key}
          label={it.value}
          checked={!!props.checked[it.key]}
          onChange={e => props.onChangeChecked(it, e.target.checked)}
        />
      ))}
    </Content>

    <Button type="tertiary" text={props.expand ? "Скрыть" : "Показать все"} onClick={props.onToggleExpand} />
  </>
);

export default FinderView;
