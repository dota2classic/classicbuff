import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { useApi } from "../../../api/hooks";
import { useRouter } from "next/router";
import { AdminTournamentCard } from "../../../components/admin-new/AdminTournamentCard";
import BracketViewer from "components/UI/BracketViewer";
import { formatTournamentStatus } from "../../../utils/format/formatTournamentType";
import { Table, Tr } from "../../../components/UI/Table";
import { TournamentDtoStatusEnum } from "../../../api/back/models";
import Button from "../../../components/UI/Button";
import { Hint } from "../../../components/UI/Hint";

export default () => {
  const id = Number(useRouter().query.id as string);
  const api = useApi().adminTournament;
  const { data, revalidate } = api.useAdminTournamentControllerGetTournament(id);

  const { data: bracketData, revalidate: revalidateBracket } = useApi().tournament.useTournamentControllerGetBracket(
    id
  );

  const cancelTournaemnt = async () => {
    if (!data) return;
    await api.adminTournamentControllerCancelTournament({
      id: data.id
    });
    await Promise.all([revalidateBracket(), revalidate()]);
  };
  const startTournament = async () => {
    if (!data) return;

    await api.adminTournamentControllerStartTournament({
      id: data.id
    });
    await Promise.all([revalidateBracket(), revalidate()]);
  };
  return (
    <AdminLayout>
      {data && (
        <>
          <AdminTournamentCard tournament={data} />
          <Table>
            <thead>
              <Tr>
                <th>Поле</th>
                <th>Значение</th>
                <th>Действия</th>
              </Tr>
            </thead>

            <tbody>
              <Tr>
                <td>Статус</td>
                <td>{formatTournamentStatus(data.status)}</td>
                <td>
                  {data.status === TournamentDtoStatusEnum.NEW && (
                    <Button onClick={startTournament} className="small">
                      Начать турнир
                    </Button>
                  )}
                  <Button className="small" onClick={cancelTournaemnt}>
                    Отменить турнир
                  </Button>
                </td>
              </Tr>
            </tbody>
          </Table>
        </>
      )}

      {(bracketData && (
        <>
          <BracketViewer rounds={bracketData.winning} />
          <BracketViewer rounds={bracketData.losing} />
        </>
      )) || <Hint>{data?.status === TournamentDtoStatusEnum.NEW && "Турнир еще не начат"}</Hint>}
    </AdminLayout>
  );
};
