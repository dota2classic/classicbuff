import Layout from "../../components/Layout";
import Head from "next/head";
import React from "react";
import useTeam from "../../data/useTeam";
import { useRouter } from "next/router";
import styled from "styled-components";
import Roster from "../../components/Roster";
import AuthService from "../../service/AuthService";

const TeamLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export default () => {
  const { id } = useRouter().query;

  const { data } = useTeam(Number(id));

  return (
    <Layout title={<h3>{data?.Team.name}</h3>}>
      <Head>
        <title>{data?.Team.name || ""}</title>
      </Head>

      <h2 style={{ color: "white" }}>
        {AuthService.me?.discord_id === data?.Team.creator.discord_id ? "Ваша команда" : undefined}
      </h2>
      <TeamLayout>{data?.Team && <Roster {...data.Team} />}</TeamLayout>
    </Layout>
  );
};
