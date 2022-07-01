import { AdminLayout } from "../../components/admin/AdminLayout";
import React from "react";
import { appApi, useApi } from "../../api/hooks";
import { GameServer } from "../../components/admin-new/GameServer";
import styled from "styled-components";
import { LiveSession } from "../../components/admin-new/LiveSession";
import { Table, Tr } from "../../components/UI/Table";
import formatGameMode from "utils/format/formatGameMode";

const Section = styled.h3`
  color: white;
`;
const Page = () => {
  const { data: serverPool } = useApi().adminApi.useServerControllerServerPool();
  const { data: liveSessions } = useApi().adminApi.useServerControllerLiveSessions();

  const { data: allowedModes, mutate } = useApi().statsApi.useStatsControllerGetMatchmakingInfo();

  // @ts-ignore
  allowedModes?.sort((a, b) => a.mode - b.mode);
  return (
    <AdminLayout>
      <Section>Режимы игры</Section>

      <Table>
        <thead>
          <Tr>
            <th>Ссылка</th>
            <th>Версия игры</th>
            <th>Действия</th>
          </Tr>
        </thead>
        <tbody>
          {allowedModes?.map(t => (
            <Tr>
              <td>{t.version}</td>
              <td>{formatGameMode(t.mode)}</td>
              <td>
                <input
                  onChange={e => {
                    appApi.adminApi
                      .adminUserControllerUpdateGameMode({
                        mode: t.mode as any,
                        version: t.version as any,
                        enabled: e.target.checked
                      })
                      .then(result => mutate(result as any));
                  }}
                  type="checkbox"
                  checked={t.enabled}
                />
              </td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Section>Пул серверов</Section>

      <Table>
        <thead>
          <Tr>
            <th>Ссылка</th>
            <th>Версия игры</th>
            <th>Действия</th>
          </Tr>
        </thead>
        <tbody>
          {serverPool?.map(t => (
            <GameServer {...t} />
          ))}
        </tbody>
      </Table>

      <Section>Текущие сессии</Section>

      <Table>
        <thead>
          <Tr>
            <th>Ссылка</th>
            <th>ID матча</th>
            <th>Режим</th>
            <th>Команды</th>
            <th>Действия</th>
          </Tr>
        </thead>
        <tbody>
          {liveSessions?.map(t => (
            <LiveSession {...t} />
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Page;
