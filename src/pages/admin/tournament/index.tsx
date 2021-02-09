import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { useApi } from "../../../api/hooks";
import TournamentCard from "components/UI/TournamentCard";
import { AdminTournamentCard } from "../../../components/admin-new/AdminTournamentCard";
import Button, { LinkButton } from "components/UI/Button";
import Link from "next/link";

export default () => {
  const { data } = useApi().adminTournament.useAdminTournamentControllerListTournaments();
  return (
    <AdminLayout>
      <Link href={`/admin/tournament/create`} passHref>
        <LinkButton>Создать турнир</LinkButton>
      </Link>
      <br />
      {data?.map(tournament => (
        <AdminTournamentCard tournament={tournament} />
      ))}
    </AdminLayout>
  );
};
