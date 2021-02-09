import {
  FullTournamentDtoEntryTypeEnum,
  FullTournamentDtoStatusEnum,
  TournamentDtoEntryTypeEnum,
  TournamentDtoStatusEnum
} from "../../api/back/models";

export const formatTournamentType = (t: FullTournamentDtoEntryTypeEnum | TournamentDtoEntryTypeEnum): string => {
  switch (t) {
    case TournamentDtoEntryTypeEnum.PLAYER:
      return "1x1";
    case TournamentDtoEntryTypeEnum.TEAM:
      return `5x5`;
    default:
      return "...";
  }
};

export const formatTournamentStatus = (t: TournamentDtoStatusEnum | FullTournamentDtoStatusEnum): string => {
  switch (t) {
    case TournamentDtoStatusEnum.NEW:
      return "Открыта регистрация";
    case TournamentDtoStatusEnum.ONGOING:
      return "Турнир в процессе";
    case TournamentDtoStatusEnum.FINISHED:
      return "Турнир завершен";
    case TournamentDtoStatusEnum.CANCELLED:
      return "Турнир отменен";
    default:
      return "...";
  }
};
