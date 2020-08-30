import Head from "next/head";
import LadderRow, { LadderHeader, Table } from "../../components/LadderRow";
import Layout from "../../components/Layout";
import React from "react";
import useSWR from "swr";
import api from "../../service/api";
import { QueueDTO } from "../../utils/dto";
import frwd from "../../utils/frwd";
import Queue from "../../components/admin/Queue";
import { AdminLayout } from "../../components/admin/AdminLayout";

const Page = () => {
  const { data, error, isValidating, revalidate } = useSWR("/admin/queues", frwd<QueueDTO[]>(api.get));

  console.log(data);

  return (
    <AdminLayout>
      {!data && `Loading...`}

      {data?.map(d => (
        <Queue invalidate={revalidate} {...d} />
      ))}
    </AdminLayout>
  );
};

export default Page;
