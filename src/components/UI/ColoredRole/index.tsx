import styled from "styled-components";
import { colors } from "../../../shared";

export const ColoredRole = styled.span`
  &.old {
    color: ${colors.roles.old};
  }

  &.human {
    color: ${colors.roles.human};
  }

  &.admin {
    color: ${colors.roles.admin};
  }

  &.moderator {
    color: ${colors.roles.moderator};
  }
`;
