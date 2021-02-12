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
import {
  TournamentBracketMatchDto,
  TournamentBracketMatchDtoStatusEnum,
  TournamentBracketParticipantDto
} from "../../../api/back/models";
import { ParticipantResultDto } from "../../../api/back/models/ParticipantResultDto";

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

  const hasOpponent1 = !!(data?.opponent1 && data.opponent1.participant);
  const hasOpponent2 = !!(data?.opponent2 && data.opponent2.participant);

  if (!data) return <AdminLayout />;
  return (
    <AdminLayout>
      {data.games.map(game => {
        const radiantPlayer =
          data &&
          hasOpponent2 &&
          hasOpponent1 &&
          (game.teamOffset === 0 ? data.opponent1!!.participant!! : data.opponent2!!.participant!!);
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
                  {(game.externalMatchId && (
                    <Link href={`/match/${game.externalMatchId}`}>
                      <LinkButton>{game.externalMatchId}</LinkButton>
                    </Link>
                  )) || <Hint>Матч еще не прошел</Hint>}
                </td>
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
                    selected={new Date(game.scheduledDate)}
                    onChange={(date: Date) => scheduleMatch(game.id, date)}
                  />
                </td>
              </Tr>

              <Tr>
                <td>Техлузы</td>

                <td>
                  {hasOpponent1 && hasOpponent2 && !hasResult && !locked && (
                    <Button onClick={() => forfeit(game.id, data.opponent1!!.participant!!)} className="small">
                      Техлуз оппоненту 1
                    </Button>
                  )}
                  <br />
                  {hasOpponent1 && hasOpponent2 && !hasResult && !locked && (
                    <Button onClick={() => forfeit(game.id, data.opponent2!!.participant!!)} className="small">
                      Техлуз оппоненту 2
                    </Button>
                  )}
                </td>
              </Tr>

              <Tr>
                <td>Победитель</td>

                <td>
                  {hasOpponent1 && hasOpponent2 && !hasResult && (
                    <Button onClick={() => setWinner(game.id, data.opponent1!!.participant!!)} className="small">
                      Победил оппонент 1
                    </Button>
                  )}
                  <br />
                  {hasOpponent1 && hasOpponent2 && !hasResult && (
                    <Button onClick={() => setWinner(game.id, data.opponent2!!.participant!!)} className="small">
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
