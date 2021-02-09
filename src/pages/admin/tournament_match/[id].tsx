import { AdminLayout } from "../../../components/admin/AdminLayout";
import React from "react";
import { useRouter } from "next/router";
import { useApi } from "../../../api/hooks";
import { Table, Tr } from "../../../components/UI/Table";
import Button, { LinkButton } from "../../../components/UI/Button";
import DatePicker, { registerLocale } from "react-datepicker";
import Input from "../../../components/UI/Input";
import ru from "date-fns/locale/ru";
import Link from "next/link";
import { Hint } from "../../../components/UI/Hint";
import { OpponentPreview } from "../../../components/UI/OpponentPreview";
import { formatMatchState } from "../../../utils/formatMatchStatus";
import { SeedItemDto, TournamentMatchDto, TournamentMatchDtoStatusEnum } from "../../../api/back/models";

registerLocale("ru", ru);

export default () => {
  const mId = Number(useRouter().query.id as string);

  const api = useApi().adminTournament;
  const { data, mutate } = api.useAdminTournamentControllerTournamentMatch(mId);

  const scheduleMatch = async (d: Date) => {
    if (!data) return;

    const res = await api.adminTournamentControllerScheduleTournamentMatch(data.id, {
      scheduledDate: d.getTime()
    });

    if (res) {
      await mutate(res);
    }
  };

  const setWinner = async (opp: SeedItemDto) => {
    if (!data) return;
    let m: TournamentMatchDto;
    if (opp.team) {
      m = await api.adminTournamentControllerSetWinner(data.id, {
        winnerId: opp.team!!.id
      });
    } else {
      m = await api.adminTournamentControllerSetWinner(data.id, {
        winnerId: opp.profile!!.id
      });
    }
    await mutate(m);
  };

  const forfeit = async (opp: SeedItemDto) => {
    if (!data) return;
    let m: TournamentMatchDto;
    if (opp.team) {
      m = await api.adminTournamentControllerForfeit(data.id, {
        forfeitId: opp.team!!.id
      });
    } else {
      m = await api.adminTournamentControllerForfeit(data.id, {
        forfeitId: opp.profile!!.id
      });
    }
    await mutate(m);
  };

  const hasResult =
    data?.status === TournamentMatchDtoStatusEnum.Completed || data?.status === TournamentMatchDtoStatusEnum.Archived;
  const hasOpponent1 = !!(data?.opponent1 && !data.opponent1.tbd);
  const hasOpponent2 = !!(data?.opponent2 && !data.opponent2.tbd);

  const radiantPlayer =
    data && hasOpponent2 && hasOpponent1 && (data.teamOffset === 0 ? data.opponent1 : data.opponent2);

  return (
    <AdminLayout>
      {data && (
        <Table>
          <thead>
            <Tr>
              <th>Key</th>
              <th>Value</th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <td>Ссылка на матч</td>
              <td>
                {(data.externalMatchId && (
                  <Link href={`/match/${data.externalMatchId}`}>
                    <LinkButton>{data.externalMatchId}</LinkButton>
                  </Link>
                )) || <Hint>Матч еще не прошел</Hint>}
              </td>
            </Tr>
            <Tr>
              <td>Статус</td>
              <td>{formatMatchState(data.status)}</td>
            </Tr>
            <Tr>
              <td>Оппонент 1</td>
              <td>{(hasOpponent1 && <OpponentPreview seed={data.opponent1!!} />) || <Hint>Еще не определен</Hint>}</td>
            </Tr>
            <Tr>
              <td>Оппонент 2</td>
              <td>{(hasOpponent2 && <OpponentPreview seed={data.opponent2!!} />) || <Hint>Еще не определен</Hint>}</td>
            </Tr>

            <Tr>
              <td>За свет играет</td>
              <td>{(radiantPlayer && <OpponentPreview seed={radiantPlayer} />) || <Hint>Еще не определено</Hint>}</td>
            </Tr>
            <Tr>
              <td>Запланированная дата</td>
              <td>
                <DatePicker
                  locale="ru"
                  showTimeSelect
                  customInputRef={""}
                  dateFormat={"dd MMMM yyyy HH:mm"}
                  customInput={<Input className={"iso"} />}
                  selected={new Date(data.scheduledDate)}
                  onChange={(date: Date) => scheduleMatch(date)}
                />
              </td>
            </Tr>

            <Tr>
              <td>Техлузы</td>

              <td>
                {hasOpponent1 && !hasResult && (
                  <Button onClick={() => forfeit(data.opponent1!!)} className="small">
                    Техлуз оппоненту 1
                  </Button>
                )}
                <br />
                {hasOpponent2 && !hasResult && (
                  <Button onClick={() => forfeit(data.opponent2!!)} className="small">
                    Техлуз оппоненту 2
                  </Button>
                )}
              </td>
            </Tr>

            <Tr>
              <td>Победитель</td>

              <td>
                {hasOpponent1 && !hasResult && (
                  <Button onClick={() => setWinner(data.opponent1!!)} className="small">
                    Победил оппонент 1
                  </Button>
                )}
                <br />
                {hasOpponent2 && !hasResult && (
                  <Button onClick={() => setWinner(data.opponent2!!)} className="small">
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
