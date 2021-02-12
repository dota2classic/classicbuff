import Layout from "../../../components/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { appApi, useApi } from "../../../api/hooks";
import styled from "styled-components";
import { colors } from "../../../shared";
import { OpponentPreview } from "../../../components/UI/OpponentPreview";
import { Table, Tr } from "../../../components/UI/Table";
import MatchRow from "../../../components/MatchRow";
import Head from "next/head";
import { MatchDto } from "../../../api/back/models";
import { Hint } from "../../../components/UI/Hint";
import { formatDateStr } from "../../../utils/format/formateDateStr";
import { Tab, Tabs } from "../../../components/UI/Tabs";
import { useTab } from "../../../utils/useTab";
import cx from "classnames";
import Link from "next/link";
import { AppRouter } from "../../../utils/route";
const Block = styled.div`
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 100%;

  background: ${colors.darkBg2};

  margin-bottom: 40px;

  justify-content: space-between;

  &.reverse {
    flex-direction: row-reverse;
  }
`;

const Versus = styled.div`
  color: ${colors.position.foreground.gold};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 16px;
  margin-right: 5px;
`;
const TbdOpponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //justify-content: center;
  padding: 20px;
  color: ${colors.primaryText};
`;

const BlockOpponent = styled.div`
  flex: 1;
`;
const Title = styled.div`
  color: ${colors.primaryText};
`;

const InfoRow = styled.div`
  color: ${colors.primaryText};
  font-size: 14px;
`;

export default () => {
  const matchId = Number(useRouter().query.match_id);

  const { data } = useApi().tournament.useTournamentControllerTournamentMatch(matchId);

  const [matches, setMatches] = useState<MatchDto[]>([]);
  const [tab, setTab] = useTab("game", undefined);

  useEffect(() => {
    if (!data) return;

    if (data.games.length && tab === undefined) {
      setTab(0);
    }
    Promise.all(
      data.games
        .filter(t => !!t.externalMatchId)
        .map(async g => appApi.matchApi.matchControllerMatch(g.externalMatchId!!))
    ).then(setMatches);
  }, [data]);

  const selectedGame = data && tab !== undefined && data.games[tab];

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
        <Title>Соперники</Title>
        <BlockOpponent>
          {(data.opponent1?.participant && <OpponentPreview seed={data.opponent1?.participant} />) || (
            <TbdOpponent>TBD</TbdOpponent>
          )}
        </BlockOpponent>
        <BlockOpponent>
          {(data.opponent2?.participant && <OpponentPreview seed={data.opponent2?.participant} />) || (
            <TbdOpponent>TBD</TbdOpponent>
          )}
        </BlockOpponent>
      </Block>

      <Block>
        <Title>Информация о матче</Title>
        <Table>
          <tbody>
            <Tr>
              <td>Формат</td>
              <td>Best of {data.games.length}</td>
            </Tr>
            <Tr>
              <td>Время начала матча</td>
              <td>{formatDateStr(data.startDate)}</td>
            </Tr>
          </tbody>
        </Table>
      </Block>

      <Tabs>
        {data.games.map((game, index) => (
          <Tab className={cx(tab === index && "active")} onClick={() => setTab(index)}>
            Игра {game.number}
          </Tab>
        ))}
      </Tabs>

      {selectedGame && (
        <Table>
          <thead>
            <Tr>
              <th>Поле</th>
              <th>Значение </th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <td>Номер игры в серии</td>
              <td>{selectedGame.number}</td>
            </Tr>
            <Tr>
              <td>Игрок за свет</td>
              <td>
                {(data.opponent1?.participant &&
                  data.opponent2?.participant &&
                  (selectedGame.teamOffset === 0 ? (
                    <OpponentPreview seed={data.opponent1.participant} />
                  ) : (
                    <OpponentPreview seed={data.opponent2.participant} />
                  ))) ||
                  "Еще не определен"}
              </td>
            </Tr>

            <Tr>
              <td>Матч</td>
              <td>
                {(selectedGame.externalMatchId && (
                  <Link {...AppRouter.match(selectedGame.externalMatchId).link}>Ссылка на матч</Link>
                )) ||
                  "Еще не прошел"}
              </td>
            </Tr>
          </tbody>
        </Table>
      )}

      <br />
      <br />
      <br />

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
