import React from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useApi } from "../../api/hooks";
import { useEventSource } from "../../utils/useEventSource";

const Page = () => {
  return <AdminLayout></AdminLayout>;
};

export default Page;
