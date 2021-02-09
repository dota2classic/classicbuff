import { SeedItemDto } from "../../../api/back/models";
import React from "react";
import TeamCard from "../TeamCard";
import { TeamMemberPreview } from "../TeamMemberPreview";

export interface Props {
  seed: SeedItemDto;
}
export const OpponentPreview = ({ seed }: Props) => {
  if (seed.isTeam) {
    return <TeamCard team={seed.team!!} />;
  } else {
    return <TeamMemberPreview profile={seed.profile!!} />;
  }
};
