import React from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { LiveMatch } from "../../components/live/LiveMatch";
import { useApi } from "../../api/hooks";

const Page = () => {
  const { data } = useApi().matchApi.useMatchControllerLiveMatches({
    refreshInterval: 1000
  });
  return (
    <AdminLayout>
      {data?.map(t => (
        <LiveMatch {...t} />
      ))}
    </AdminLayout>
  );
};

export default Page;
