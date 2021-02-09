import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import cx from "classnames";
import { PlayerHover } from "../PlayerHover";
import { BracketRoundDto, BracketRoundDtoRTypeEnum, SeedDto, SeedItemDto } from "../../../api/back/models";
import Link from "next/link";

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
        {p.seed.result !== undefined && <span className="seed-score">{p.seed.result === "win" ? "1" : "0"}</span>}
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
        {(seed.matchId && (
          <Link passHref href={`/match/${seed.matchId}`}>
            <SeedsWrapper>
              <RenderSeed seed={seed.teams[0]} />
              <RenderSeed seed={seed.teams[1]} />
            </SeedsWrapper>
          </Link>
        )) || (
          <SeedsWrapper>
            <RenderSeed seed={seed.teams[0]} />
            <RenderSeed seed={seed.teams[1]} />
          </SeedsWrapper>
        )}
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
