import { AdminLayout } from "../../components/admin/AdminLayout";
import React from "react";
import { useApi } from "../../api/hooks";
import { GameServer } from "../../components/admin-new/GameServer";
import { Table, Tr } from "components/LadderRow";
import styled from "styled-components";
import { LiveSession } from "../../components/admin-new/LiveSession";

const Section = styled.h3`
  color: white;
`;
const Page = () => {
  const { data: serverPool } = useApi().adminApi.useServerControllerServerPool();
  const { data: liveSessions } = useApi().adminApi.useServerControllerLiveSessions();

  return (
    <AdminLayout>
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
