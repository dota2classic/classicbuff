import ReactModal from "react-modal";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import {
  Player,
  PlayerFragmentFragment,
  TeamEntity,
  useInvitePlayerMutation,
  User,
  useUsersQuery
} from "../generated/sdk";
import { BaseGQLConfig } from "../shared";
import Input from "./Input";
import { Table, Tr } from "./LadderRow";
import { Callback } from "tsconfig-paths-webpack-plugin/lib/plugin";
import { ApolloError } from "@apollo/client";

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`;

const PlayerRow = styled.div`
  display: flex;
  color: white;
  & span {
    font-size: 18px;
  }

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const UserRow = (player: PlayerFragmentFragment & { onClick: () => void }) => {
  return (
    <Tr className="link" onClick={player.onClick}>
      <td>{player.name}</td>
      <td>{player.mmr} MMR</td>
    </Tr>
  );
};

interface Props {
  hide: () => void;
  team?: TeamEntity;
}
export default (props: Props) => {
  const [search, setSearch] = useState("");

  const [invite] = useInvitePlayerMutation();

  const { data, refetch } = useUsersQuery({
    ...BaseGQLConfig,
    variables: {
      name: search
    }
  });
  return (
    <ReactModal isOpen>
      <Content>
        <Input placeholder="Имя игрока" value={search} onChange={e => setSearch(e.target.value)} />
        <Table>
          <thead>
            <Tr>
              <th>Имя</th>
              <th>ММР</th>
            </Tr>
          </thead>
          <tbody>
            {data?.Users?.map(it => (
              <UserRow
                onClick={async () => {
                  if (!props.team) return;
                  try {
                    await invite({
                      variables: {
                        id: props.team.id,
                        uid: it.discord_id
                      }
                    });
                    props.hide();
                  } catch (e) {
                    alert(e.message);
                  }
                }}
                key={it.discord_id}
                {...it.player}
              />
            ))}
          </tbody>
        </Table>
      </Content>
      <br />
      <Button onClick={props.hide}>Отмена</Button>
    </ReactModal>
  );
};
