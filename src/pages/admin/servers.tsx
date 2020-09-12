import { AdminLayout } from "../../components/admin/AdminLayout";
import React from "react";
import ServerOperator from "../../components/admin/ServerOperator";
import useServers from "../../data/admin/useServers";

const Page = () => {
  const { data, error, isValidating, revalidate } = useServers();

  console.log(data);

  return (
    <AdminLayout>
      {data?.GameServers.map(it => (
        <ServerOperator {...it} revalidate={revalidate} />
      ))}
    </AdminLayout>
  );
};

export default Page;
