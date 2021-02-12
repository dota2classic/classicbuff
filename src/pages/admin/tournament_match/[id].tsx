import { AdminLayout } from "../../../components/admin/AdminLayout";
import React from "react";
import { useRouter } from "next/router";
import { useApi } from "../../../api/hooks";
import { Table, Tr } from "../../../components/UI/Table";
import Button, { LinkButton } from "../../../components/UI/Button";
import DatePicker from "react-datepicker";
import Input from "../../../components/UI/Input";
import Link from "next/link";
import { Hint } from "../../../components/UI/Hint";
import { OpponentPreview } from "../../../components/UI/OpponentPreview";
import { SeedItemDto, TournamentMatchDto, TournamentMatchDtoStatusEnum } from "../../../api/back/models";

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

  const setWinner = async (gameId: number, opp: SeedItemDto) => {
    if (!data) return;
    let m: TournamentMatchDto;
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

  const forfeit = async (gameId: number, opp: SeedItemDto) => {
    if (!data) return;
    let m: TournamentMatchDto;
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
    data?.status === TournamentMatchDtoStatusEnum.Completed || data?.status === TournamentMatchDtoStatusEnum.Archived;

  const locked = data?.status === TournamentMatchDtoStatusEnum.Locked;

  const hasOpponent1 = !!(data?.opponent1 && !data.opponent1.tbd);
  const hasOpponent2 = !!(data?.opponent2 && !data.opponent2.tbd);

  if (!data) return <AdminLayout />;
  return (
    <AdminLayout>
      {data.games.map(game => {
        const radiantPlayer =
          data && hasOpponent2 && hasOpponent1 && (game.teamOffset === 0 ? data.opponent1 : data.opponent2);
        return (
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
                <td>{game.number}</td>
              </Tr>
              <Tr>
                <td>Ссылка на матч</td>
                <td>
                  {(game.matchId && (
                    <Link href={`/match/${game.matchId}`}>
                      <LinkButton>{game.matchId}</LinkButton>
                    </Link>
                  )) || <Hint>Матч еще не прошел</Hint>}
                </td>
              </Tr>
              <Tr>
                <td>Оппонент 1</td>
                <td>
                  {(hasOpponent1 && <OpponentPreview seed={data.opponent1!!} />) || <Hint>Еще не определен</Hint>}
                </td>
              </Tr>
              <Tr>
                <td>Оппонент 2</td>
                <td>
                  {(hasOpponent2 && <OpponentPreview seed={data.opponent2!!} />) || <Hint>Еще не определен</Hint>}
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
                    selected={new Date(game.scheduledDate)}
                    onChange={(date: Date) => scheduleMatch(game.gameId, date)}
                  />
                </td>
              </Tr>

              <Tr>
                <td>Техлузы</td>

                <td>
                  {hasOpponent1 && hasOpponent2 && !hasResult && !locked && (
                    <Button onClick={() => forfeit(game.gameId, data.opponent1!!)} className="small">
                      Техлуз оппоненту 1
                    </Button>
                  )}
                  <br />
                  {hasOpponent1 && hasOpponent2 && !hasResult && !locked && (
                    <Button onClick={() => forfeit(game.gameId, data.opponent2!!)} className="small">
                      Техлуз оппоненту 2
                    </Button>
                  )}
                </td>
              </Tr>

              <Tr>
                <td>Победитель</td>

                <td>
                  {hasOpponent1 && hasOpponent2 && !hasResult && (
                    <Button onClick={() => setWinner(game.gameId, data.opponent1!!)} className="small">
                      Победил оппонент 1
                    </Button>
                  )}
                  <br />
                  {hasOpponent1 && hasOpponent2 && !hasResult && (
                    <Button onClick={() => setWinner(game.gameId, data.opponent2!!)} className="small">
                      Победи оппонент 2
                    </Button>
                  )}
                </td>
              </Tr>
            </tbody>
          </Table>
        );
      })}
    </AdminLayout>
  );
};
