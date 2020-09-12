import { AdminLayout } from "../../components/admin/AdminLayout";
import React from "react";
import useServers from "../../data/admin/useServers";
import useRooms from "../../data/admin/useRooms";
import Room from "../../components/admin/Room";

export default () => {
  const { data, error, isValidating, revalidate } = useRooms();

  return (
    <AdminLayout>
      {data?.Rooms.map(it => (
        <Room {...it} />
      ))}
    </AdminLayout>
  );
};
