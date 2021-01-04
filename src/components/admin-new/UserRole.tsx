import { UserRoleSummaryDto } from "../../api/back/models";
import React from "react";
import styled from "styled-components";
import { RoleNames } from "../../utils/format/roles";
import { Tr } from "../UI/Table";
import { Role } from "../LadderRow";

const RolesPreview = styled.div`
  display: flex;
  flex-direction: row;
`;
export const UserRole = (it: UserRoleSummaryDto & { onClick: () => void }) => {
  return (
    <Tr style={{ cursor: "pointer" }} onClick={it.onClick}>
      <td>{it.steamId}</td>
      <td>{it.name}</td>
      <td>
        <RolesPreview>
          {it.entries.map(role => (
            <Role className={role.role}>
              <div>{RoleNames[role.role]}</div>
            </Role>
          ))}
        </RolesPreview>
      </td>
    </Tr>
  );
};
