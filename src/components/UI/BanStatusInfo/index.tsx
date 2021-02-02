import { BanStatusDto } from "../../../api/back/models";
import styled from "styled-components";
import React, { ReactNode } from "react";
import { Hint } from "../Hint";
import { formatDateFullStr, formatDateStr } from "../../../utils/format/formateDateStr";

interface Props {
  ban: BanStatusDto;
}

const Reason = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EndTime = styled.div``;

const reasons: any = {
  [0]: <Reason>Вы слишком часто отклоняли найденную игру</Reason>,
  [1]: <Reason>Вы не загружаетесь в игры</Reason>,
  [2]: <Reason>Решение администрации</Reason>,
  [3]: <Reason>Жалобы от игроков</Reason>
};
export const BanStatusInfo = ({ ban }: Props) => {
  return (
    <Container>
      <Hint>Вам запрещен поиск игр в этом режиме</Hint>
      {reasons[(ban.status as unknown) as any] as ReactNode}

      <EndTime>Время окончания: {formatDateStr(ban.bannedUntil)}</EndTime>
    </Container>
  );
};
