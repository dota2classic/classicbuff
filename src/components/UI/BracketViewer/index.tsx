import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import cx from "classnames";
import { PlayerHover } from "../PlayerHover";
import {
  BracketRoundDto,
  BracketRoundDtoRTypeEnum,
  SeedDto,
  SeedItemDto,
  TournamentBracketInfoDto
} from "../../../api/back/models";
import Link from "next/link";
import { AppRouter } from "../../../utils/route";
import { BracketsViewer } from "../../../utils/bracket-viewer/main";

export const RoundTitle = styled.div`
  color: ${colors.primaryTextHighlight};
  font-weight: 400;
  text-align: center;
`;

const BracketWrapper = styled.div`
  margin: 100px auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  & .seed-team {
    display: flex;
    flex-direction: row;

    & .seed-name {
      flex: 1;
      text-align: left;
      padding-left: 10px;
    }
    &.win {
      color: ${colors.dota.green};
    }

    &.loss {
      color: ${colors.dota.red};
    }

    &.tbd {
      color: ${colors.primaryTextDark};
    }
  }

  & .bracket__seed-item {
    background-color: ${colors.transparentTint3};
    color: ${colors.primaryText};
    //display: flex;
    //flex-direction: row;
  }
  & .bracket-block {
    & .bracket__arrow-holder::after,
    .bracket__arrow-holder::before {
      border-color: ${colors.transparentTint3} !important;
    }
  }

  & .seed-score {
    color: ${colors.primaryTextHighlight};
  }
`;

const SeedsWrapper = styled.a`
  display: flex;
  flex-direction: column;

  color: ${colors.primaryText};
  text-decoration: none;

  & div + div {
    border-top: 1px solid ${colors.transparentTint};
  }
`;

interface SeedProps {
  seed?: SeedItemDto;
}

const SeedImage = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
`;

const RenderSeed = (p: SeedProps) => {
  if (!p.seed) return <SeedTeam className={cx("seed-team", "tbd")}>Нет соперника</SeedTeam>;

  if (p.seed.tbd) return <SeedTeam className={cx("seed-team", "tbd")}>TBD</SeedTeam>;

  if (p.seed.profile)
    return (
      <SeedTeam className={cx("seed-team", p?.seed?.result)}>
        <SeedImage src={p.seed.profile.avatar} />
        <div className="seed-name">{p.seed.profile.name}</div>
        {p.seed.result !== undefined && <span className="seed-score">{p.seed.score}</span>}
      </SeedTeam>
    );

  return (
    <SeedTeam>
      <SeedImage src={p.seed.team!!.imageUrl} />
      <div className="seed-name">{p.seed.team!!.name}</div>
    </SeedTeam>
  );
};
const CustomSeed = (seed: SeedDto, breakpoint: number, roundIndex: number) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} className="bracket__arrow-holder">
      <SeedItem className="bracket__seed-item">
        <Link passHref {...AppRouter.tournamentMatch.match(seed.id).link}>
          <SeedsWrapper>
            <RenderSeed seed={seed.teams[0]} />
            <RenderSeed seed={seed.teams[1]} />
          </SeedsWrapper>
        </Link>
      </SeedItem>
    </Seed>
  );
};

const AdminSeedRender = (seed: SeedDto, breakpoint: number, roundIndex: number) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} className="bracket__arrow-holder">
      <SeedItem className="bracket__seed-item">
        <Link passHref href={`/admin/tournament_match/${seed.id}`}>
          <SeedsWrapper>
            <RenderSeed seed={seed.teams[0]} />
            <RenderSeed seed={seed.teams[1]} />
          </SeedsWrapper>
        </Link>
      </SeedItem>
    </Seed>
  );
};

interface Props {
  rounds: BracketRoundDto[];
}
export default ({ rounds }: Props) => {
  return (
    <BracketWrapper>
      <Bracket
        roundTitleComponent={(p, idx) => (
          <RoundTitle>
            {rounds[idx].rType === BracketRoundDtoRTypeEnum.FINAL ? "Финал" : `Раунд ${rounds[idx].round}`}
          </RoundTitle>
        )}
        renderSeedComponent={CustomSeed}
        rounds={rounds}
        bracketClassName={"bracket-block"}
      />
    </BracketWrapper>
  );
};

export const AdminBracketViewer = ({ rounds }: Props) => {
  return (
    <BracketWrapper>
      <Bracket
        roundTitleComponent={(p, idx) => (
          <RoundTitle>
            {rounds[idx].rType === BracketRoundDtoRTypeEnum.FINAL ? "Финал" : `Раунд ${rounds[idx].round}`}
          </RoundTitle>
        )}
        renderSeedComponent={AdminSeedRender}
        rounds={rounds}
        bracketClassName={"bracket-block"}
      />
    </BracketWrapper>
  );
};

interface NewProps {
  bracket: TournamentBracketInfoDto;
  id: string;
}

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
