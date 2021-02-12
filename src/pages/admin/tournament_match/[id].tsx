import { AdminLayout } from "../../../components/admin/AdminLayout";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useApi } from "../../../api/hooks";
import { Table, Tr } from "../../../components/UI/Table";
import Button, { LinkButton } from "../../../components/UI/Button";
import DatePicker from "react-datepicker";
import Input from "../../../components/UI/Input";
import Link from "next/link";
import { Hint } from "../../../components/UI/Hint";
import { OpponentPreview } from "../../../components/UI/OpponentPreview";
import {
  TournamentBracketMatchDto,
  TournamentBracketMatchDtoStatusEnum,
  TournamentBracketParticipantDto
} from "../../../api/back/models";
import { Tab, Tabs } from "../../../components/UI/Tabs";
import { useTab } from "../../../utils/useTab";
import cx from "classnames";
// registerLocale("ru", ru);

export default () => {
  const mId = Number(useRouter().query.id as string);

  const api = useApi().adminTournament;
  const { data, mutate } = api.useAdminTournamentControllerTournamentMatch(mId);

  const scheduleMatch = async (gameId: number, d: Date) => {
    if (!data) return;

    const res = await api.adminTournamentControllerScheduleTournamentMatch(data.id, {
      scheduledDate: d.getTime(),
      gameId
    });

    if (res) {
      await mutate(res);
    }
  };

  const setWinner = async (gameId: number, opp: TournamentBracketParticipantDto) => {
    if (!data) return;
    let m: TournamentBracketMatchDto;
    if (opp.team) {
      m = await api.adminTournamentControllerSetWinner(data.id, {
        winnerId: opp.team!!.id,
        gameId
      });
    } else {
      m = await api.adminTournamentControllerSetWinner(data.id, {
        winnerId: opp.profile!!.id,
        gameId
      });
    }
    await mutate(m);
  };

  const forfeit = async (gameId: number, opp: TournamentBracketParticipantDto) => {
    if (!data) return;
    let m: TournamentBracketMatchDto;
    if (opp.team) {
      m = await api.adminTournamentControllerForfeit(data.id, {
        forfeitId: opp.team!!.id,
        gameId
      });
    } else {
      m = await api.adminTournamentControllerForfeit(data.id, {
        forfeitId: opp.profile!!.id,
        gameId
      });
    }
    await mutate(m);
  };

  const hasResult =
    data?.status === TournamentBracketMatchDtoStatusEnum.Completed ||
    data?.status === TournamentBracketMatchDtoStatusEnum.Archived;

  const locked = data?.status === TournamentBracketMatchDtoStatusEnum.Locked;

  const hasOpponent1 = !!(data?.opponent1 && data.opponent1.participant?.id);
  const hasOpponent2 = !!(data?.opponent2 && data.opponent2.participant?.id);

  const [tab, setTab] = useTab("tab");

  useEffect(() => {
    if (data && tab === undefined && data.games.length > 0) {
      setTab(0);
    }
  }, [data]);

  if (!data) return <AdminLayout />;

  const radiantPlayer =
    data &&
    tab !== undefined &&
    hasOpponent2 &&
    hasOpponent1 &&
    (data.games[tab].teamOffset === 0 ? data.opponent1!!.participant!! : data.opponent2!!.participant!!);

  return (
    <AdminLayout>
      {(data.games.length === 0 && <Hint>Матч завершен автоматически без игр</Hint>) || undefined}
      <Tabs>
        {data.games.map((game, i) => (
          <Tab className={cx(tab == i && "active")} onClick={() => setTab(i)}>
            Игра #{game.number}
          </Tab>
        ))}
      </Tabs>
      {tab !== undefined && data.games.length && data.games[tab] && (
        <Table>
          <thead>
            <Tr>
              <th>Key</th>
              <th>Value</th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <td>Номер матча</td>
              <td>{data.games[tab].number}</td>
            </Tr>
            <Tr>
              <td>Ссылка на матч</td>
              <td>
                {(data.games[tab].externalMatchId && (
                  <Link href={`/match/${data.games[tab].externalMatchId}`}>
                    <LinkButton>{data.games[tab].externalMatchId}</LinkButton>
                  </Link>
                )) || <Hint>Матч еще не прошел</Hint>}
              </td>
            </Tr>
            <Tr>
              <td>ID игры</td>
              <td>{data.games[tab].id}</td>
            </Tr>
            <Tr>
              <td>Оппонент 1</td>
              <td>
                {(hasOpponent1 && <OpponentPreview seed={data.opponent1?.participant!!} />) || (
                  <Hint>Еще не определен</Hint>
                )}
              </td>
            </Tr>
            <Tr>
              <td>Оппонент 2</td>
              <td>
                {(hasOpponent2 && <OpponentPreview seed={data.opponent2?.participant!!} />) || (
                  <Hint>Еще не определен</Hint>
                )}
              </td>
            </Tr>

            <Tr>
              <td>За свет играет</td>
              <td>{(radiantPlayer && <OpponentPreview seed={radiantPlayer} />) || <Hint>Еще не определено</Hint>}</td>
            </Tr>
            <Tr>
              <td>Запланированная дата</td>
              <td>
                <DatePicker
                  showTimeSelect
                  customInputRef={""}
                  timeIntervals={1}
                  dateFormat={"dd MMMM yyyy HH:mm"}
                  customInput={<Input className={"iso"} />}
                  selected={new Date(data.games[tab].scheduledDate)}
                  onChange={(date: Date) => scheduleMatch(data.games[tab].id, date)}
                />
              </td>
            </Tr>

            <Tr>
              <td>Техлузы</td>

              <td>
                {!data.games[tab].finished && hasOpponent1 && hasOpponent2 && !hasResult && !locked && (
                  <Button onClick={() => forfeit(data.games[tab].id, data.opponent1!!.participant!!)} className="small">
                    Техлуз оппоненту 1
                  </Button>
                )}
                <br />
                {!data.games[tab].finished && hasOpponent1 && hasOpponent2 && !hasResult && !locked && (
                  <Button onClick={() => forfeit(data.games[tab].id, data.opponent2!!.participant!!)} className="small">
                    Техлуз оппоненту 2
                  </Button>
                )}
              </td>
            </Tr>

            <Tr>
              <td>Статус игры</td>
              <td>{data.games[tab].finished ? "Игра завершена/отменена" : "Игра ожидает начала"}</td>
            </Tr>

            <Tr>
              <td>Победитель</td>

              <td>
                {!data.games[tab].finished && hasOpponent1 && hasOpponent2 && !hasResult && (
                  <Button
                    onClick={() => setWinner(data.games[tab].id, data.opponent1!!.participant!!)}
                    className="small"
                  >
                    Победил оппонент 1
                  </Button>
                )}
                <br />
                {!data.games[tab].finished && hasOpponent1 && hasOpponent2 && !hasResult && (
                  <Button
                    onClick={() => setWinner(data.games[tab].id, data.opponent2!!.participant!!)}
                    className="small"
                  >
                    Победи оппонент 2
                  </Button>
                )}
              </td>
            </Tr>
          </tbody>
        </Table>
      )}
    </AdminLayout>
  );
};
