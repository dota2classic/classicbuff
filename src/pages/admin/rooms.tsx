import { AdminLayout } from "../../components/admin/AdminLayout";
import React from "react";
import Room from "../../components/admin/Room";
import { useRoomsQuery } from "../../generated/sdk";
import { BaseGQLConfig } from "../../shared";

export default () => {
  const { data } = useRoomsQuery({
    ...BaseGQLConfig
  });

  return (
    <AdminLayout>
      {data?.Rooms?.map(it => (
        <Room {...it} />
      ))}
    </AdminLayout>
  );
};
