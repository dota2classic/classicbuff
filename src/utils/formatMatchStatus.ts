import { TournamentMatchDtoStatusEnum } from "../api/back/models";

export const formatMatchState = (ts: TournamentMatchDtoStatusEnum) => {
  switch (ts) {
    case TournamentMatchDtoStatusEnum.Locked:
      return "Ожидание матчей";
    case TournamentMatchDtoStatusEnum.Waiting:
      return "Ожидание соперника";
    case TournamentMatchDtoStatusEnum.Ready:
      return "Готов к запуску";
    case TournamentMatchDtoStatusEnum.Running:
      return "В процессе";
    case TournamentMatchDtoStatusEnum.Completed:
      return "Завершен";
    case TournamentMatchDtoStatusEnum.Archived:
      return "Архивирован";
  }
};
