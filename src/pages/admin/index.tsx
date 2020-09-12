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
import useTeams from "../../data/useTeams";
import useQueues from "../../data/admin/useQueues";

const Page = () => {
  const { data, error, isValidating, revalidate } = useQueues();

  console.log(data);

  return (
    <AdminLayout>
      {!data && `Loading...`}

      {data?.Queues.map(d => (
        <Queue invalidate={revalidate} {...d} />
      ))}
    </AdminLayout>
  );
};

export default Page;
