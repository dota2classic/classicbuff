import React from "react";
import Queue from "../../components/admin/Queue";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useQueuesQuery } from "../../generated/sdk";
import { BaseGQLConfig } from "../../shared";

const Page = () => {
  const { data, refetch } = useQueuesQuery({
    ...BaseGQLConfig
  });

  return (
    <AdminLayout>
      {!data && `Loading...`}

      {data?.Queues.map(d => (
        <Queue invalidate={refetch} {...d} />
      ))}
    </AdminLayout>
  );
};

export default Page;
