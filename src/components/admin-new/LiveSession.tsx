import { GameSessionDto } from "../../api/back/models";
import React from "react";
import { Tr } from "../LadderRow";
import formatGameMode from "../../utils/format/formatGameMode";
import styled from "styled-components";
import Button from "../UI/Button";
import { appApi } from "../../api/hooks";
import { mutate } from "swr";

const TooltipTeams = styled.div`
  position: relative;

  &:hover {
    & div.tooltip {
      display: flex;
    }
  }

  & div.tooltip {
    flex-direction: row;
    top: 0;
    left: 0;
    right: 0;
    display: none;
    position: absolute;
    background: rgba(0, 0, 0, 1);
    padding: 10px;
  }
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & span:first-child {
    margin-bottom: 10px;
  }
`;

export const LiveSession = (it: GameSessionDto) => {
  return (
    <Tr>
      <td>{it.url}</td>
      <td>{it.matchId}</td>
      <td>{formatGameMode(it.info.mode)}</td>
      <td>
        <TooltipTeams>
          <span>Команды(наведи для списка)</span>
          <div className={"tooltip"}>
            <Team>
              <span>Свет</span>
              {it.info.radiant.map(t => (
                <span>{t}</span>
              ))}
            </Team>
            <Team>
              <span>Тьма</span>
              {it.info.dire.map(t => (
                <span>{t}</span>
              ))}
            </Team>
          </div>
        </TooltipTeams>
      </td>
      <td>
        <Button
          className="small"
          onClick={async () => {
            await appApi.adminApi.serverControllerStopServer(it.url);
            await mutate(JSON.stringify(appApi.adminApi.serverControllerLiveSessionsContext()), undefined, true);
          }}
        >
          Остановить
        </Button>
      </td>
    </Tr>
  );
};
