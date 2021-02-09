import React from "react";
import { Table, Tr } from "../components/UI/Table";

interface Props {
  json: any;
}
export const JsonTable = ({ json }: Props) => {
  return (
    <Table>
      <thead>
        <Tr>
          <th>Key</th>
          <th>Value</th>
        </Tr>
      </thead>
      <tbody>
        {Object.entries(json).map(([key, value]) => (
          <Tr>
            <td>{key}</td>
            <td>{(typeof value === "object" ? JSON.stringify(value) : value) as any}</td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};
