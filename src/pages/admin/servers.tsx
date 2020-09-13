import { AdminLayout } from "../../components/admin/AdminLayout";
import React from "react";
import ServerOperator from "../../components/admin/ServerOperator";
import { useGameServersQuery } from "../../generated/sdk";
import { BaseGQLConfig } from "../../shared";

const Page = () => {
  const { data, refetch } = useGameServersQuery({
    ...BaseGQLConfig
  });

  return (
    <AdminLayout>
      {data?.GameServers.map(it => (
        <ServerOperator {...it} revalidate={refetch} />
      ))}
    </AdminLayout>
  );
};

export default Page;
