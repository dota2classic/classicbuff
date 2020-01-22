import React from "react";
import styled from "styled-components";
import SearchInput from "../forms/SearchInput/SearchInput";
import Checkbox from "../forms/Checkbox/Checkbox";
import Button from "../Button/Button";
import LoaderBlock from "../Loader/LoaderBlock";

export interface IFinderItem {
  key: string;
  value: string;
}

export interface IFinder {
  data: IFinderItem[];
  dataLoading?: boolean;

  searchResult: IFinderItem[];
  searchLoading?: boolean;

  query: string;
  onChangeQuery: (query: string) => void;

  expand: boolean;
  onToggleExpand: () => void;

  checked: { [key: string]: string };
  onChangeChecked: (data: IFinderItem, checked: boolean) => void;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin: 8px 0;
  min-height: 280px;

  & > * {
    margin-bottom: 4px;
  }

  &.expand {
    height: 320px;
    overflow-y: scroll;
  }
`;

const NoDataBlock = styled.div``;

const Finder = (props: IFinder) => {
  const showLoader = props.expand
    ? props.searchLoading && props.searchResult.length === 0
    : props.dataLoading && props.data.length === 0;
  const isEmpty = props.expand && !props.searchLoading && props.searchResult.length === 0;

  return (
    <>
      <SearchInput placeholder="Наименование..." value={props.query} onChange={props.onChangeQuery} />

      <LoaderBlock loading={showLoader}>
        <Content className={props.expand ? "expand" : ""}>
          {isEmpty && <NoDataBlock>Ничего не найдено</NoDataBlock>}

          {(props.expand ? props.searchResult : props.data).map(it => (
            <Checkbox
              key={it.key}
              label={it.value}
              checked={!!props.checked[it.key]}
              onChange={e => props.onChangeChecked(it, e.target.checked)}
            />
          ))}
        </Content>
      </LoaderBlock>

      <Button type="tertiary" text={props.expand ? "Скрыть" : "Показать все"} onClick={props.onToggleExpand} />
    </>
  );
};

export default Finder;
