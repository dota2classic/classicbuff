import React, { useState } from "react";
import { TournamentLayout } from "../../components/Layout";
import TeamPreview from "../../components/TeamPreview";
import AuthService from "../../service/AuthService";
import { LinkButton } from "../../components/Button";
import { observer } from "mobx-react";
import Link from "next/link";
import { useTeamsQuery } from "../../generated/sdk";

export default observer(() => {
  const [page, setPage] = useState(0);
  const { data } = useTeamsQuery({
    variables: {
      page
    }
  });

  return (
    <TournamentLayout>
      {AuthService.authorized && (
        <Link passHref href={`/teams/new`}>
          <LinkButton>Создать команду</LinkButton>
        </Link>
      )}

      <br />
      {data?.Teams.data?.map(TeamPreview)}
    </TournamentLayout>
  );
});
