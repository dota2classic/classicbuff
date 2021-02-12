import { TournamentBracketMatchDtoStatusEnum } from "../api/back/models";

export const formatMatchState = (ts: TournamentBracketMatchDtoStatusEnum) => {
  switch (ts) {
    case TournamentBracketMatchDtoStatusEnum.Locked:
      return "Ожидание матчей";
    case TournamentBracketMatchDtoStatusEnum.Waiting:
      return "Ожидание соперника";
    case TournamentBracketMatchDtoStatusEnum.Ready:
      return "Готов к запуску";
    case TournamentBracketMatchDtoStatusEnum.Running:
      return "В процессе";
    case TournamentBracketMatchDtoStatusEnum.Completed:
      return "Завершен";
    case TournamentBracketMatchDtoStatusEnum.Archived:
      return "Архивирован";
  }
};
