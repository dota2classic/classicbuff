import Layout from "../../components/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { appApi, useApi } from "../../api/hooks";
import styled from "styled-components";
import { colors } from "../../shared";
import { Tab, Tabs } from "../../components/UI/Tabs";
import { useTab } from "../../utils/useTab";
import cx from "classnames";
import TournamentCard from "components/UI/TournamentCard";
import { useStores } from "../../stores";
import Button from "../../components/UI/Button";
import { TeamMemberPreview } from "../../components/UI/TeamMemberPreview";
import { InviteToTeamModal } from "../../components/modal/InviteToTeamModal";
import Head from "next/head";

const Roster = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 24px;
  color: ${colors.primaryText};
  margin-top: 20px;
  margin-bottom: 20px;
`;
const PlayerPreview = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }

  & span {
    display: flex;
    justify-content: center;
    font-size: 16px;
    align-items: center;
    padding-left: 10px;

    & .team-tag {
      color: ${colors.primaryTextDark};
    }
  }
`;

const Card = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
`;

const TournamentName = styled.div`
  font-size: 30px;
  color: ${colors.primaryText};
`;

const TournamentImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;

interface TeamTournamentProps {
  id: string;
}
const TeamTournaments = ({ id }: TeamTournamentProps) => {
  const { data } = useApi().team.useTeamControllerGetTeamTournaments(id);

  return (
    <>
      {data?.map(t => (
        <TournamentCard tournament={t} />
      ))}
    </>
  );
};

const TeamMemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export default () => {
  const id = useRouter().query.id as string;
  const { data, revalidate } = useApi().team.useTeamControllerGetTeam(id);
  const { auth } = useStores();
  const [tab, setTab] = useTab("tab", 0);

  const [open, setOpen] = useState(false);

  if (!data) return <Layout />;

  const isCreator = data.creator === auth.steamID;
  const isLocked = data.locked;
  return (
    <Layout>
      <Head>
        <title>Команда {data.name}</title>
      </Head>

      <InviteToTeamModal open={open} close={() => setOpen(false)} />
      <TournamentImage src={data.imageUrl} />
      <TournamentName>{data.name}</TournamentName>

      <Tabs>
        <Tab className={cx(tab === 0 && "active")} onClick={() => setTab(0)}>
          Состав
        </Tab>
        <Tab className={cx(tab === 1 && "active")} onClick={() => setTab(1)}>
          Турниры
        </Tab>
        {isCreator && !isLocked && <Tab onClick={() => setOpen(true)}>Пригласить игрока</Tab>}
        {data.members.find(t => t.steamId === auth.steamID) && (
          <Tab onClick={() => appApi.team.teamControllerLeaveTeam().then(revalidate)}>Покинуть команду</Tab>
        )}
      </Tabs>
      <TabWrapper>
        {tab === 0 && (
          <>
            {data.members.map(t => (
              <TeamMemberPreview
                onKick={
                  (isCreator &&
                    !isLocked &&
                    (() => appApi.team.teamControllerKickFromTeam(t.steamId).then(revalidate))) ||
                  undefined
                }
                profile={{ ...t, id: t.steamId }}
              />
            ))}
          </>
        )}

        {tab === 1 && <TeamTournaments id={data.id} />}
      </TabWrapper>
    </Layout>
  );
};
