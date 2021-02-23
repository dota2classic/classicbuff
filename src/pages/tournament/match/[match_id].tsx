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
import { DateFormatter, formatDateStr } from "../../../utils/format/formateDateStr";
import { Tab, Tabs } from "../../../components/UI/Tabs";
import { useTab } from "../../../utils/useTab";
import cx from "classnames";
import Link from "next/link";
import { AppRouter } from "../../../utils/route";
import i18n from "pages-i18n/tournament/tournament-match.i18n";

import hi18n from "pages-i18n/history.i18n";
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
  margin-bottom: 5px;
  margin-top: 5px;
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
        <Title>{i18n.info}</Title>
        <Table>
          <tbody>
            <Tr>
              <td>{i18n.mode}</td>
              <td>{i18n.withValues.bestOf({ bestOf: data.games.length })}</td>
            </Tr>
            <Tr>
              <td>{i18n.timeStart}</td>
              <td>
                <DateFormatter date={data.startDate} />
              </td>
            </Tr>
          </tbody>
        </Table>
      </Block>

      <Tabs>
        {data.games.map((game, index) => (
          <Tab className={cx(tab === index && "active")} onClick={() => setTab(index)}>
            {i18n.withValues.gameNumber({ gn: game.number })}
          </Tab>
        ))}
      </Tabs>

      {selectedGame && (
        <Block>
          <Title>{i18n.details}</Title>
          <Table>
            <tbody>
              <Tr>
                <td>{i18n.gameNumberInSeries}</td>
                <td>{selectedGame.number}</td>
              </Tr>
              <Tr>
                <td>{i18n.radiantPlayer}</td>
                <td>
                  {(data.opponent1?.participant &&
                    data.opponent2?.participant &&
                    (selectedGame.teamOffset === 0 ? (
                      <OpponentPreview seed={data.opponent1.participant} />
                    ) : (
                      <OpponentPreview seed={data.opponent2.participant} />
                    ))) ||
                    i18n.notDecided}
                </td>
              </Tr>

              <Tr>
                <td>{i18n.match}</td>
                <td>
                  {(selectedGame.externalMatchId && (
                    <Link {...AppRouter.match(selectedGame.externalMatchId).link}>Ссылка на матч</Link>
                  )) ||
                    i18n.matchNotFinished}
                </td>
              </Tr>
            </tbody>
          </Table>
        </Block>
      )}

      <br />
      <br />
      <br />

      {(matches.length && (
        <Table className="compact">
          <thead>
            <Tr>
              <th>{hi18n.tableMatchId}</th>
              <th>{hi18n.tableMode}</th>
              <th>{hi18n.tableWinner}</th>
              <th>{hi18n.tableDuration}</th>
              <th className="green omit">{hi18n.tableRadiant}</th>
              <th className="red omit">{hi18n.tableDire}</th>
            </Tr>
          </thead>
          <tbody>
            {matches.map((it, index) => (
              <MatchRow {...it} />
            ))}
          </tbody>
        </Table>
      )) || <Hint>{i18n.noMatchesPlayed}</Hint>}
    </Layout>
  );
};
