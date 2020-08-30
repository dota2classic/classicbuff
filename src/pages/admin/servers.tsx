import { AdminLayout } from "../../components/admin/AdminLayout";
import React from "react";
import useSWR from "swr";
import frwd from "../../utils/frwd";
import { QueueDTO, ServerOperatorDTO } from "../../utils/dto";
import api from "../../service/api";
import ServerOperator from "../../components/admin/ServerOperator";

const Page = () => {
  const { data, error, isValidating, revalidate } = useSWR("/admin/gameservers", frwd<ServerOperatorDTO[]>(api.get));

  console.log(data);

  return (
    <AdminLayout>
      {data?.map(it => (
        <ServerOperator {...it} revalidate={revalidate} />
      ))}
    </AdminLayout>
  );
};

export default Page;
