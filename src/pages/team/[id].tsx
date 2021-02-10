import Layout from "../../components/Layout";
import React from "react";
import { useRouter } from "next/router";
import { useApi } from "../../api/hooks";
import styled from "styled-components";
import { colors } from "../../shared";
import { PlayerHover } from "../../components/UI/PlayerHover";
import { numToSteamId } from "../../utils/numSteamId";
import Link from "next/link";
import { Tab, Tabs } from "../../components/UI/Tabs";
import { useTab } from "../../utils/useTab";
import cx from "classnames";
import TournamentCard from "components/UI/TournamentCard";
import { useStores } from "../../stores";
import Button from "../../components/UI/Button";

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

const TournamentType = styled.div``;

const TournamentImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
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

export default () => {
  const id = useRouter().query.id as string;
  const { data } = useApi().team.useTeamControllerGetTeam(id);
  const { auth } = useStores();
  const [tab, setTab] = useTab("tab", 0);

  if (!data) return <Layout />;
  return (
    <Layout>
      <TournamentImage src={data.imageUrl} />
      <TournamentName>{data.name}</TournamentName>
      <Tabs>
        <Tab className={cx(tab === 0 && "active")} onClick={() => setTab(0)}>
          Состав
        </Tab>
        <Tab className={cx(tab === 1 && "active")} onClick={() => setTab(1)}>
          Турниры
        </Tab>
      </Tabs>
      <TabWrapper>
        {tab === 0 && (
          <>
            {data.members.map(t => (
              <PlayerHover compact steam_id={t.steamId}>
                <Link href={`/player/${numToSteamId(t.steamId)}`} passHref>
                  <PlayerPreview>
                    <img src={t.avatar} alt="" />
                    <span>
                      <span className="team-tag">{data?.tag}</span>.{t.name}
                    </span>
                  </PlayerPreview>
                </Link>
              </PlayerHover>
            ))}

            {data.creator === auth?.steamID && (
              <>
                <br />
                <Button>Пригласить игрока</Button>
              </>
            )}
          </>
        )}

        {tab === 1 && <TeamTournaments id={data.id} />}
      </TabWrapper>
    </Layout>
  );
};