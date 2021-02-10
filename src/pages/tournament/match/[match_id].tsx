import Layout from "../../../components/Layout";
import React from "react";
import { useRouter } from "next/router";
import { useApi } from "../../../api/hooks";
import styled from "styled-components";
import { colors } from "../../../shared";
import { BigOpponentPreview } from "../../../components/UI/OpponentPreview";
import { Table, Tr } from "../../../components/UI/Table";
import MatchRow from "../../../components/MatchRow";
import Head from "next/head";
import { TournamentMatchDtoStatusEnum } from "../../../api/back/models";
import { formatDateStr } from "../../../utils/format/formateDateStr";

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

const Title = styled.div``;

export default () => {
  const matchId = Number(useRouter().query.match_id);

  const { data } = useApi().tournament.useTournamentControllerTournamentMatch(matchId);

  const { data: mData } = useApi().matchApi.useMatchControllerMatch(data?.externalMatchId || 0);

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

      {data.scheduledDate &&
        data.status !== TournamentMatchDtoStatusEnum.Completed &&
        data.status !== TournamentMatchDtoStatusEnum.Archived && (
          <Title>Запланированная дата: {formatDateStr(data.scheduledDate)}</Title>
        )}

      <Block className={data.teamOffset === 0 ? "regular" : "reverse"}>
        {(data.opponent1 && <BigOpponentPreview seed={data.opponent1} />) || <TbdOpponent>TBD</TbdOpponent>}
        <Versus>VS</Versus>
        {(data.opponent2 && <BigOpponentPreview seed={data.opponent2} />) || <TbdOpponent>TBD</TbdOpponent>}
      </Block>

      {mData && (
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
            {[mData].map((it, index) => (
              <MatchRow {...it} />
            ))}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};
