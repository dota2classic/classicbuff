import React, { useState } from "react";
import { TournamentLayout } from "../../components/Layout";
import TeamPreview, { TableTeamPreview } from "../../components/TeamPreview";
import AuthService from "../../service/AuthService";
import { LinkButton } from "../../components/Button";
import { observer } from "mobx-react";
import Link from "next/link";
import { useTeamsQuery } from "../../generated/sdk";
import { Table, Tr } from "../../components/LadderRow";
import Head from "next/head";

export default observer(() => {
  const [page, setPage] = useState(0);
  const { data } = useTeamsQuery({
    variables: {
      page
    }
  });

  return (
    <TournamentLayout>
      <Head>
        <title>Команды - dota2classic.ru</title>
        <meta name="description" content="dota2classic.ru - список команд и их успеваемость" />
      </Head>

      {AuthService.authorized && (
        <Link passHref href={`/teams/new`}>
          <LinkButton>Создать команду</LinkButton>
        </Link>
      )}

      <br />

      <Table className="compact">
        <thead>
          <Tr>
            <th style={{ width: 80 }} />
            <th>Название</th>
            <th>Тег</th>
            <th>Матчей</th>
            <th>Игроков</th>
          </Tr>
        </thead>

        <tbody>{data?.Teams.data?.map(TableTeamPreview)}</tbody>
      </Table>
    </TournamentLayout>
  );
});
