import { Table, Tr } from "./index";
import React from "react";

export default {
  component: Table,
  title: "UI/Table/Table"
};

export const all = () => {
  return (
    <Table>
      <thead>
        <Tr>
          <th>Heading1</th>
          <th>Heading2</th>
          <th>Heading3</th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <td>value1_1</td>
          <td>value1_2</td>
          <td>value1_3</td>
        </Tr>

        <Tr>
          <td>value2_1</td>
          <td>value2_2</td>
          <td>value2_3</td>
        </Tr>
        <Tr>
          <td>value3_1</td>
          <td>value3_2</td>
          <td>value3_3</td>
        </Tr>
      </tbody>
    </Table>
  );
};
