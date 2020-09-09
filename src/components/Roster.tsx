import styled from "styled-components";
import { TeamEntity } from "../shared";
import React from "react";
import { Table, Tr } from "./LadderRow";
import Link from "next/link";
import { steamIdToNum } from "../utils/numSteamId";

const Roster = styled.div`
  color: white;
  flex-direction: column;
  & h3 {
  }
`;

const TeamMember = styled.a`
  display: flex;
  color: white;
  flex-direction: row;
`;

export default (team: TeamEntity) => {
  return (
    <Roster>
      <h3>Игроки</h3>

      <Table>
        <thead>
          <Tr>
            <th />
            <th>Никнейм</th>
            <th>Рейтинг</th>
          </Tr>
        </thead>
        <tbody>
          {team.members.map((it, index) => (
            <Tr>
              <td>{index + 1}</td>
              <td>
                <Link href={`/player/${steamIdToNum(it.user.steam_id!!)}`}>
                  <a>
                    {(it.user.discord_id === team.creator.discord_id && "👑") || undefined} {it.user.player?.name}
                  </a>
                </Link>
              </td>
              <td>{it.user.player?.mmr}</td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Roster>
  );
};
