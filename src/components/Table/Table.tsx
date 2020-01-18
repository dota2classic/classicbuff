import React, { Component, ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../shared/styles";

export type TableColumn<T> = {
  header: ReactNode;
  cell: React.ComponentClass<T> | React.FunctionComponent<T>;
  right?: boolean;
  dark?: boolean;
  fullWidth?: boolean;
};

export type TableGroup<T> = Array<TableColumn<T>>;

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;

  border-bottom: 1px solid ${colors.common.menu};

  color: ${colors.text.secondary};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 46px;
  padding-top: 5px;
  cursor: pointer;
  position: relative;

  transition: background-color 0.15s ease;

  :hover {
    background: ${colors.createHover(colors.common.background)};
  }

  :nth-of-type(odd) {
    background: ${colors.frame.tiling};

    :hover {
      background: ${colors.createHover(colors.frame.tiling)};
    }
  }
`;

const StyledColumnGroup = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 20px;
  flex: 1;
`;

const StyledColumn = styled.div`
  margin-left: 20px;
  overflow: hidden;
  flex: 1;
  width: 0;

  &:first-of-type {
    margin-left: 0;
  }

  &.right {
    text-align: right;
  }
`;

export default class Table<T> extends Component<{
  columns: Array<TableGroup<T>>;
  data: T[];
}> {
  render() {
    const { columns: groups, data } = this.props;

    return (
      <StyledTable>
        <HeaderRow groups={groups} />

        <TableBody>
          {data.map((item, key) => (
            <Row groups={groups} item={item} key={key} />
          ))}
        </TableBody>
      </StyledTable>
    );
  }
}

class HeaderRow<T> extends Component<{ groups: Array<TableGroup<T>> }> {
  render() {
    const { groups } = this.props;

    return (
      <TableHeader>
        {groups.map((columns, key) => (
          <ColumnGroup columns={columns} header key={key} />
        ))}
      </TableHeader>
    );
  }
}

class Row<T> extends Component<{ groups: Array<TableGroup<T>>; item?: T; header?: boolean }> {
  render() {
    const { groups, item, header } = this.props;

    return (
      <StyledRow>
        {groups.map((columns, key) => (
          <ColumnGroup columns={columns} item={item} header={header} key={key} />
        ))}
      </StyledRow>
    );
  }
}

class ColumnGroup<T> extends Component<{ columns: TableGroup<T>; item?: T; header?: boolean }> {
  render() {
    const { columns, item, header } = this.props;

    return (
      <StyledColumnGroup>
        {columns.map((column, key) => (
          <Column {...column} item={item} key={key} header={header && column.header} />
        ))}
      </StyledColumnGroup>
    );
  }
}

class Column<T> extends Component<TableColumn<T> & { item?: T; header?: ReactNode }> {
  render() {
    const CellComponent = this.props.cell;
    return (
      <StyledColumn className={this.props.right ? "right" : ""}>
        {this.props.header || (this.props.item && <CellComponent {...this.props.item} />)}
      </StyledColumn>
    );
  }
}
