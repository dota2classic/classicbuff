import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import { BracketsViewer } from "../../../utils/bracket-viewer/main";
import { TournamentBracketInfoDto } from "../../../api/back/models";

const BracketViewerWrapper = styled.div`
  &.bracket-viewer {
    font-family: "Trajan Pro 3", sans-serif;
    color: ${colors.primaryText};
    background: transparent;

    & h1 {
      display: none;
    }
  }

  & .round {
    & h3 {
      background: ${colors.transparentTint};
      color: ${colors.primaryText};
    }
  }
  & .connect-next::after,
  & .connect-previous::before {
    border-color: ${colors.transparentTint} !important;
  }
  & .match {
    & .opponents {
      border-color: ${colors.transparentTint3};

      & > span:first-child {
        background: ${colors.evenDarkerBg};
        color: ${colors.primaryTextHighlight};
      }

      & > span:nth-child(2) {
        &.best-of-x {
          right: 10px;
          left: auto;
        }
        background: ${colors.evenDarkerBg};
        color: ${colors.primaryTextHighlight};
      }
    }

    & .participant.hover {
      background: ${colors.transparentTint} !important;
    }
    & .participant {
      &.win .result {
        color: ${colors.dota.green} !important;
      }

      &.loss .result {
        color: ${colors.dota.red} !important;
      }

      & .result {
        width: 10px !important;
        margin-left: 0;
        padding-left: 10px;
        padding-right: 10px;
      }

      & .participant-image {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        object-fit: cover;
        border-radius: 4px;
      }
      & .name {
        display: flex;
        flex-direction: row;

        & span {
          color: ${colors.primaryTextHighlight} !important;
          font-size: 12px;
        }
      }
      background: ${colors.transparentTint3};
      font-size: 14px;
    }
  }
`;

interface NewProps {
  bracket: TournamentBracketInfoDto;
  id: string;
}

export const AdminBracketViewerNew = ({ bracket, id }: NewProps) => {
  useEffect(() => {
    const bracketViewer = new BracketsViewer();

    const el = document.querySelector(`#` + id);
    if (el) el.innerHTML = "";

    bracketViewer.render(
      {
        stages: bracket.stage as any,
        matches: bracket.match,
        matchGames: [],
        participants: bracket.participant as any
      },
      {
        selector: "#" + id,
        participantOriginPlacement: "before",
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true
      }
    );
  }, [id, bracket]);

  return <BracketViewerWrapper className="bracket-viewer" id={id} />;
};
