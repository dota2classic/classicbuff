import Layout from "../../../components/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { appApi, useApi } from "../../../api/hooks";
import styled from "styled-components";
import { colors } from "../../../shared";
import { BigOpponentPreview } from "../../../components/UI/OpponentPreview";
import { Table, Tr } from "../../../components/UI/Table";
import MatchRow from "../../../components/MatchRow";
import Head from "next/head";
import { MatchDto } from "../../../api/back/models";
import { Hint } from "../../../components/UI/Hint";

const Block = styled.div`
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  width: 100%;

  margin-bottom: 40px;

  justify-content: space-between;

  &.reverse {
    flex-direction: row-reverse;
  }
`;

const Versus = styled.div`
  color: ${colors.primaryTextHighlight};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TbdOpponent = styled.div``;

const Title = styled.div`
  color: ${colors.primaryText};
`;

export default () => {
  const matchId = Number(useRouter().query.match_id);

  const { data } = useApi().tournament.useTournamentControllerTournamentMatch(matchId);

  const [matches, setMatches] = useState<MatchDto[]>([]);

  useEffect(() => {
    if (!data) return;
    Promise.all(
      data.games.filter(t => !!t.matchId).map(async g => appApi.matchApi.matchControllerMatch(g.matchId!!))
    ).then(setMatches);
  }, [data]);
  if (!data) return <Layout />;
  return (
    <Layout>
      <Head>
        <title>Турнирный матч {matchId}</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.81 2014 года"
        />
      </Head>
      <Block>
        {(data.opponent1 && <BigOpponentPreview seed={data.opponent1} />) || <TbdOpponent>TBD</TbdOpponent>}
        <Versus>VS</Versus>
        {(data.opponent2 && <BigOpponentPreview seed={data.opponent2} />) || <TbdOpponent>TBD</TbdOpponent>}
      </Block>

      {(matches.length && (
        <Table className="compact">
          <thead>
            <Tr>
              <th>ID матча</th>
              <th>Режим</th>
              <th>Победитель</th>
              <th>Длительность</th>
              <th className="green omit">Силы Света</th>
              <th className="red omit">Силы Тьмы</th>
            </Tr>
          </thead>
          <tbody>
            {matches.map((it, index) => (
              <MatchRow {...it} />
            ))}
          </tbody>
        </Table>
      )) || <Hint>Еще не сыграно ни одного матча в серии</Hint>}
    </Layout>
  );
};
