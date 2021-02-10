import { TournamentDto, TournamentDtoStatusEnum } from "../../../api/back/models";
import styled from "styled-components";
import React from "react";
import { formatTournamentType } from "../../../utils/format/formatTournamentType";
import { colors } from "../../../shared";
import Link from "next/link";
import { formatDateStr } from "../../../utils/format/formateDateStr";
import { AppRouter } from "../../../utils/route";

interface Props {
  tournament: TournamentDto;
}

const Card = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  border-radius: 4px;
  text-decoration: none;
  width: 100%;
  background: ${colors.darkBg2};

  padding: 20px;
  border: 1px solid ${colors.transparentTint3};

  transition: 0.3s ease;

  &:hover {
    background: ${colors.evenDarkerBg};

    box-shadow: 0px 0px 14px 1px rgba(255, 255, 255, 0.1);
  }

  & + & {
    margin-top: 20px;
  }
`;

const TournamentName = styled.div`
  font-size: 20px;
`;

const TournamentType = styled.div``;

const TournamentImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

export default ({ tournament }: Props) => {
  return (
    <Link passHref {...AppRouter.tournament.tournament(tournament.id).link}>
      <Card>
        <TournamentImage src={tournament.imageUrl} />
        <InfoContainer>
          <TournamentName>{tournament.name}</TournamentName>
          {tournament.status === TournamentDtoStatusEnum.NEW && (
            <TournamentType>Начало {formatDateStr(tournament.startDate)}</TournamentType>
          )}
          {tournament.status === TournamentDtoStatusEnum.ONGOING && <TournamentType>В процессе</TournamentType>}
          {tournament.status === TournamentDtoStatusEnum.FINISHED && <TournamentType>Завершен</TournamentType>}
          {tournament.status === TournamentDtoStatusEnum.CANCELLED && <TournamentType>Отменен</TournamentType>}

          <TournamentType>Формат {formatTournamentType(tournament.entryType)}</TournamentType>
        </InfoContainer>
      </Card>
    </Link>
  );
};
