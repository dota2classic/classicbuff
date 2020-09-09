import { gql } from "graphql-request";

export const FullMatchFragment = gql`
  fragment FullMatchFragment on Match {
    duration
    id
    radiant_win
    timestamp
    type
    players {
      player {
        steam_id
        mmr
        name
      }

      hero
      items
      level

      team

      kills
      deaths
      assists

      gpm
      xpm

      last_hits
      denies
    }
  }
`;

export const MatchNoPlayersFragment = gql`
  fragment MatchNoPlayersFragment on Match {
    duration
    radiant_win
    timestamp
    id
    type
    players {
      hero
      level
      items

      team

      kills
      deaths
      assists

      gpm
      xpm

      last_hits
      denies
    }
  }
`;

export const PlayerFragment = gql`
  fragment PlayerFragment on Player {
    mmr
    steam_id
    name
  }
`;

export const FullTeamFragment = gql`
  fragment FullTeamFragment on TeamEntity {
    name
    id
    image {
      id
      path
    }
    creator {
      discord_id
      steam_id
      player {
        name
      }
    }
    members {
      user {
        discord_id
        steam_id
        player {
          name
          mmr
        }
      }
    }
  }
`;
