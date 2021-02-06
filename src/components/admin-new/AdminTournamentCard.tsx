import styled from "styled-components";
import React from "react";
import Link from "next/link";
import { TournamentDto, TournamentDtoStatusEnum } from "../../api/back/models";
import { colors } from "../../shared";
import { formatDateStr } from "../../utils/format/formateDateStr";
import { formatTournamentType } from "../../utils/format/formatTournamentType";

interface Props {
  tournament: TournamentDto;
}

const Card = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
  flex: 1;
  width: 100%;

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
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

export const AdminTournamentCard = ({ tournament }: Props) => {
  return (
    <Link passHref href={`/admin/tournament/${tournament.id}`}>
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
