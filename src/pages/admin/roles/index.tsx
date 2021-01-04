import { AdminLayout } from "../../../components/admin/AdminLayout";
import React, { useState } from "react";
import { useApi } from "../../../api/hooks";
import { UserRole } from "../../../components/admin-new/UserRole";
import { UserRoleSummaryDto } from "../../../api/back/models";
import { ManageRolesModal } from "../../../components/admin-new/ManageRolesModal";
import { SelectUserModal } from "../../../components/admin-new/SelectUserModal";
import Button from "../../../components/UI/Button";
import { Table, Tr } from "../../../components/UI/Table";

export default () => {
  const { data } = useApi().adminApi.useAdminUserControllerListRoles();
  const [selectedUser, setSelectedUser] = useState<UserRoleSummaryDto | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <AdminLayout>
      <ManageRolesModal user={selectedUser} close={() => setSelectedUser(null)} />
      <SelectUserModal
        open={selectOpen}
        close={() => setSelectOpen(false)}
        onSelect={(sid, name) => {
          const ex = data?.find(t => t.steamId === sid);
          if (ex) {
            setSelectedUser(ex);
            setSelectOpen(false);

            return;
          }
          setSelectedUser({
            steamId: sid,
            name: name,
            entries: []
          });
          setSelectOpen(false);
        }}
      />

      <Button onClick={() => setSelectOpen(true)}>Добавить роль пользователю</Button>
      <br />
      <Table>
        <thead>
          <Tr>
            <th>STEAM_ID</th>
            <th>Никнейм</th>
            <th>Текущие роли</th>
          </Tr>
        </thead>
        <tbody>
          {data?.map(t => (
            <UserRole {...t} onClick={() => setSelectedUser(t)} />
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};
