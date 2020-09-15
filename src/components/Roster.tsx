import styled from "styled-components";
import React from "react";
import { Table, Tr } from "./LadderRow";
import Link from "next/link";
import { steamIdToNum } from "../utils/numSteamId";
import { TeamEntity, useKickPlayerMutation } from "../generated/sdk";
import AuthService from "../service/AuthService";
import Button from "./Button";

const Roster = styled.div`
  color: white;
  flex-direction: column;
  width: 100%;
  & h3 {
  }
`;

export default (team: TeamEntity & { refetch: () => void }) => {
  const isOwner = AuthService.me?.discord_id === team.creator?.discord_id;

  const [kick] = useKickPlayerMutation();

  return (
    <Roster>
      <h3>Состав</h3>

      <Table>
        <thead>
          <Tr>
            <th />
            <th>Никнейм</th>
            <th>Рейтинг</th>
            {isOwner && <th>Действия</th>}
          </Tr>
        </thead>
        <tbody>
          {team.members.map((it, index) => (
            <Tr>
              <td>{index + 1}</td>
              <td>
                <Link href={`/player/${steamIdToNum(it.user.steam_id!!)}`}>
                  <a>
                    {(it.user.discord_id === team.creator.discord_id && "👑") || undefined} {team.tag}.
                    {it.user.player?.name}
                  </a>
                </Link>
              </td>
              <td>{it.user.player?.mmr}</td>
              {isOwner && (
                <td>
                  <Button
                    onClick={async () => {
                      await kick({
                        variables: {
                          id: team.id,
                          uid: it.user.discord_id
                        }
                      });
                      team.refetch();
                    }}
                  >
                    Кикнуть
                  </Button>
                </td>
              )}
            </Tr>
          ))}
        </tbody>
      </Table>
    </Roster>
  );
};
