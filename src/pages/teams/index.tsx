import useTeams from "../../data/useTeams";
import React, { useState } from "react";
import Layout, { TournamentLayout } from "../../components/Layout";
import TeamPreview from "../../components/TeamPreview";
import AuthService from "../../service/AuthService";
import Button, { LinkButton } from "../../components/Button";
import { observer } from "mobx-react";
import Link from "next/link";

export default observer(() => {
  const [page, setPage] = useState(0);
  const { data } = useTeams(page);

  return (
    <TournamentLayout>
      {AuthService.authorized && (
        <Link passHref href={`/teams/new`}>
          <LinkButton>Создать команду</LinkButton>
        </Link>
      )}

      <br />
      {data?.Teams.data.map(TeamPreview)}
    </TournamentLayout>
  );
});
