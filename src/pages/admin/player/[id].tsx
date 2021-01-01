import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { useRouter } from "next/router";
import { useApi } from "../../../api/hooks";
import { numToSteamId } from "../../../utils/numSteamId";
import styled from "styled-components";
import { UserRoleSetup } from "../../../components/admin-new/UserRoleSetup";
import { UserBanSetup } from "../../../components/admin-new/UserBanSetup";

const UserInfo = styled.div`
  color: white;
`;

const Title = styled.h2`
  font-weight: 400;
`;

const Block = styled.div``;
export default () => {
  const { id } = useRouter().query;

  const sid = numToSteamId(id as string);

  const { data } = useApi().playerApi.usePlayerControllerPlayerSummary(sid);

  return (
    <AdminLayout>
      <UserInfo>
        <Title>{data?.name}</Title>

        <Block>
          <Title>Роли</Title>
          <UserRoleSetup steamId={sid} />
        </Block>

        <Block>
          <Title>Баны</Title>
          <UserBanSetup steamId={sid} />
        </Block>
      </UserInfo>
    </AdminLayout>
  );
};
