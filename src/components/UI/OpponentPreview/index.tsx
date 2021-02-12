import React from "react";
import TeamCard from "../TeamCard";
import { TeamMemberPreview } from "../TeamMemberPreview";
import { TournamentBracketParticipantDto } from "../../../api/back/models";

export interface Props {
  seed: TournamentBracketParticipantDto;
}
export const OpponentPreview = ({ seed }: Props) => {
  if (seed.team) {
    return <TeamCard team={seed.team} />;
  } else if (seed.profile) {
    return <TeamMemberPreview profile={seed.profile!!} />;
  } else {
    return <div>?</div>;
  }
};
