import { TournamentDtoEntryTypeEnum, TournamentDtoStatusEnum } from "../../api/back/models";

export const formatTournamentType = (t: TournamentDtoEntryTypeEnum): string => {
  switch (t) {
    case TournamentDtoEntryTypeEnum.PLAYER:
      return "1x1";
    case TournamentDtoEntryTypeEnum.TEAM:
      return `5x5`;
  }
};

export const formatTournamentStatus = (t: TournamentDtoStatusEnum): string => {
  switch (t) {
    case TournamentDtoStatusEnum.NEW:
      return "Новый";
    case TournamentDtoStatusEnum.ONGOING:
      return "В процессе";
    case TournamentDtoStatusEnum.FINISHED:
      return "Завершен";
    case TournamentDtoStatusEnum.CANCELLED:
      return "Отменен";
  }
};
