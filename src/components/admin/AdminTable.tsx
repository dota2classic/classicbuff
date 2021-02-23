import styled from "styled-components";

export const AdminTable = styled.table`
  width: 100%;
  & th {
    border: 1px solid #807e7e;
  }

  & td {
    border: 1px solid #585757;
  }

  & td.good {
    color: #069c06;
  }

  & td,
  th {
    padding: 12px;
    font-size: 14px;
    text-align: left;
    font-weight: normal;
  }

  border-top-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-top-color: rgb(99, 97, 94);
  border-right-color: rgb(99, 97, 94);
  border-bottom-color: rgb(99, 97, 94);
  border-left-color: rgb(99, 97, 94);
  -webkit-border-horizontal-spacing: 0px;
  -webkit-border-vertical-spacing: 0px;
`;
