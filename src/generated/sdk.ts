import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GameServerOperatorDto = {
  __typename?: "GameServerOperatorDTO";
  gameServers: Array<GameServersDto>;
  url: Scalars["String"];
};

export type GameServersDto = {
  __typename?: "GameServersDTO";
  mode?: Maybe<Scalars["Float"]>;
  running: Scalars["Boolean"];
  url: Scalars["String"];
};

export type HeroSummary = {
  __typename?: "HeroSummary";
  assists: Scalars["Float"];
  deaths: Scalars["Float"];
  games: Scalars["Float"];
  hero: Scalars["String"];
  kills: Scalars["Float"];
  losses: Scalars["Float"];
  wins: Scalars["Float"];
};

export type ImageEntity = {
  __typename?: "ImageEntity";
  id: Scalars["String"];
  path: Scalars["String"];
};

export type Match = {
  __typename?: "Match";
  duration: Scalars["Float"];
  id: Scalars["Float"];
  players: Array<PlayerInMatch>;
  radiant_win: Scalars["Boolean"];
  timestamp: Scalars["String"];
  type: Scalars["Float"];
};

export enum MatchmakingMode {
  AbilityDraft = "ABILITY_DRAFT",
  Diretide = "DIRETIDE",
  Greeviling = "GREEVILING",
  Ranked = "RANKED",
  Solomid = "SOLOMID",
  Unranked = "UNRANKED"
}

export type Mutation = {
  __typename?: "Mutation";
  createTeam: TeamEntity;
  inviteToTeam: TeamInvitationEntity;
  kickPlayer: TeamEntity;
  KillServer: Array<GameServerOperatorDto>;
  RestartServer: Array<GameServerOperatorDto>;
  StartServer: Array<GameServerOperatorDto>;
  SubmitInvitation: TeamEntity;
  updateTeam: TeamEntity;
};

export type MutationCreateTeamArgs = {
  image: Scalars["String"];
  name: Scalars["String"];
  tag: Scalars["String"];
};

export type MutationInviteToTeamArgs = {
  id: Scalars["Int"];
  uid: Scalars["String"];
};

export type MutationKickPlayerArgs = {
  id: Scalars["Int"];
  uid: Scalars["String"];
};

export type MutationKillServerArgs = {
  url: Scalars["String"];
};

export type MutationRestartServerArgs = {
  mode: MatchmakingMode;
  url: Scalars["String"];
};

export type MutationStartServerArgs = {
  mode: MatchmakingMode;
  url: Scalars["String"];
};

export type MutationSubmitInvitationArgs = {
  accept: Scalars["Boolean"];
  id: Scalars["Int"];
};

export type MutationUpdateTeamArgs = {
  id: Scalars["Int"];
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  tag?: Maybe<Scalars["String"]>;
};

export type OverallStats = {
  __typename?: "OverallStats";
  games: Scalars["Float"];
  loss: Scalars["Float"];
  wins: Scalars["Float"];
};

export type PaginatedMatch = {
  __typename?: "PaginatedMatch";
  data?: Maybe<Array<Match>>;
  page: Scalars["Float"];
  pages: Scalars["Float"];
};

export type PaginatedTeam = {
  __typename?: "PaginatedTeam";
  data?: Maybe<Array<TeamEntity>>;
  page: Scalars["Float"];
  pages: Scalars["Float"];
};

export type PartyDto = {
  __typename?: "PartyDTO";
  id: Scalars["Float"];
  leader: QueuePlayerDto;
  players: Array<QueuePlayerDto>;
};

export type Player = {
  __typename?: "Player";
  games: Array<PlayerInMatch>;
  mmr: Scalars["Float"];
  name: Scalars["String"];
  steam_id: Scalars["String"];
};

export type PlayerInMatch = {
  __typename?: "PlayerInMatch";
  assists: Scalars["Float"];
  deaths: Scalars["Float"];
  denies: Scalars["Float"];
  gpm: Scalars["Float"];
  hero: Scalars["String"];
  id: Scalars["Float"];
  items: Scalars["String"];
  kills: Scalars["Float"];
  last_hits: Scalars["Float"];
  level: Scalars["Float"];
  player: Player;
  team: Scalars["Float"];
  xpm: Scalars["Float"];
};

export type PlayerStatsDto = {
  __typename?: "PlayerStatsDto";
  denies: Scalars["Float"];
  games: Scalars["Float"];
  gpm: Scalars["Float"];
  hero: Scalars["String"];
  kda: Scalars["Float"];
  last_hits: Scalars["Float"];
  loss: Scalars["Float"];
  playerSteamId: Scalars["String"];
  wins: Scalars["Float"];
  xpm: Scalars["Float"];
};

export type PlayerStatsModel = {
  __typename?: "PlayerStatsModel";
  heroes: Array<PlayerStatsDto>;
  overall: OverallStats;
};

export type Query = {
  __typename?: "Query";
  GameServers: Array<GameServerOperatorDto>;
  Heroes: Array<HeroSummary>;
  HeroMatches: PaginatedMatch;
  History: PaginatedMatch;
  Ladder: Array<Player>;
  Match: Match;
  Player: Player;
  PlayerHistory: PaginatedMatch;
  PlayerStats: PlayerStatsModel;
  Queues: Array<QueueDto>;
  Rooms: Array<RoomDto>;
  Team: TeamEntity;
  TeamInvitations: Array<TeamInvitationEntity>;
  Teams: PaginatedTeam;
  User: User;
  Users: Array<User>;
};

export type QueryHeroMatchesArgs = {
  hero: Scalars["String"];
  page: Scalars["Int"];
};

export type QueryHistoryArgs = {
  mode?: Maybe<Scalars["Int"]>;
  page: Scalars["Int"];
};

export type QueryMatchArgs = {
  id: Scalars["Int"];
};

export type QueryPlayerArgs = {
  steam_id: Scalars["String"];
};

export type QueryPlayerHistoryArgs = {
  hero?: Maybe<Scalars["String"]>;
  page: Scalars["Int"];
  steam_id: Scalars["String"];
};

export type QueryPlayerStatsArgs = {
  steam_id: Scalars["String"];
};

export type QueryTeamArgs = {
  id: Scalars["Int"];
};

export type QueryTeamsArgs = {
  page: Scalars["Int"];
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type QueryUsersArgs = {
  name: Scalars["String"];
};

export type QueueDto = {
  __typename?: "QueueDTO";
  mode: Scalars["Float"];
  parties: Array<PartyDto>;
};

export type QueuePlayerDto = {
  __typename?: "QueuePlayerDTO";
  id: Scalars["String"];
  name: Scalars["String"];
  realm: Scalars["Float"];
};

export type RoomDto = {
  __typename?: "RoomDTO";
  id: Scalars["Float"];
  mode: Scalars["Float"];
  parties: Array<PartyDto>;
};

export type TeamEntity = {
  __typename?: "TeamEntity";
  creator: User;
  id: Scalars["Float"];
  image: ImageEntity;
  members: Array<TeamMemberEntity>;
  name: Scalars["String"];
  tag: Scalars["String"];
};

export type TeamInvitationEntity = {
  __typename?: "TeamInvitationEntity";
  id: Scalars["Float"];
  team: TeamEntity;
  user: User;
};

export type TeamMemberEntity = {
  __typename?: "TeamMemberEntity";
  team: TeamEntity;
  user: User;
};

export type User = {
  __typename?: "User";
  discord_id: Scalars["String"];
  player: Player;
  role: Scalars["Float"];
  steam_id: Scalars["String"];
  team?: Maybe<TeamMemberEntity>;
};

export type FullTeamFragmentFragment = { __typename?: "TeamEntity" } & Pick<TeamEntity, "name" | "id" | "tag"> & {
    image: { __typename?: "ImageEntity" } & Pick<ImageEntity, "id" | "path">;
    creator: { __typename?: "User" } & Pick<User, "discord_id" | "steam_id"> & {
        player: { __typename?: "Player" } & PlayerFragmentFragment;
      };
    members: Array<
      { __typename?: "TeamMemberEntity" } & {
        user: { __typename?: "User" } & Pick<User, "discord_id" | "steam_id"> & {
            player: { __typename?: "Player" } & PlayerFragmentFragment;
          };
      }
    >;
  };

export type MatchNoPlayersFragmentFragment = { __typename?: "Match" } & Pick<
  Match,
  "duration" | "radiant_win" | "timestamp" | "id" | "type"
> & { players: Array<{ __typename?: "PlayerInMatch" } & PlayerInMatchFragmentFragment> };

export type PlayerInMatchFragmentFragment = { __typename?: "PlayerInMatch" } & Pick<
  PlayerInMatch,
  "id" | "hero" | "items" | "level" | "team" | "kills" | "deaths" | "assists" | "gpm" | "xpm" | "last_hits" | "denies"
>;

export type FullPlayerInMatchFragmentFragment = { __typename?: "PlayerInMatch" } & Pick<
  PlayerInMatch,
  "id" | "hero" | "items" | "level" | "team" | "kills" | "deaths" | "assists" | "gpm" | "xpm" | "last_hits" | "denies"
> & { player: { __typename?: "Player" } & PlayerFragmentFragment };

export type FullMatchFragmentFragment = { __typename?: "Match" } & Pick<
  Match,
  "duration" | "id" | "radiant_win" | "timestamp" | "type"
> & { players: Array<{ __typename?: "PlayerInMatch" } & FullPlayerInMatchFragmentFragment> };

export type PlayerFragmentFragment = { __typename?: "Player" } & Pick<Player, "mmr" | "steam_id" | "name">;

export type SmallTeamFragment = { __typename?: "TeamEntity" } & Pick<TeamEntity, "name" | "id" | "tag"> & {
    image: { __typename?: "ImageEntity" } & Pick<ImageEntity, "id" | "path">;
  };

export type TeamFragmentFragment = { __typename?: "TeamEntity" } & Pick<TeamEntity, "name" | "id"> & {
    image: { __typename?: "ImageEntity" } & Pick<ImageEntity, "id">;
    creator: { __typename?: "User" } & { player: { __typename?: "Player" } & Pick<Player, "name"> };
    members: Array<
      { __typename?: "TeamMemberEntity" } & {
        user: { __typename?: "User" } & { player: { __typename?: "Player" } & Pick<Player, "name"> };
      }
    >;
  };

export type MatchQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type MatchQuery = { __typename?: "Query" } & { Match: { __typename?: "Match" } & FullMatchFragmentFragment };

export type HistoryQueryVariables = Exact<{
  page: Scalars["Int"];
  mode?: Maybe<Scalars["Int"]>;
}>;

export type HistoryQuery = { __typename?: "Query" } & {
  History: { __typename?: "PaginatedMatch" } & Pick<PaginatedMatch, "page" | "pages"> & {
      data?: Maybe<Array<{ __typename?: "Match" } & MatchNoPlayersFragmentFragment>>;
    };
};

export type HeroHistoryQueryVariables = Exact<{
  page: Scalars["Int"];
  hero: Scalars["String"];
}>;

export type HeroHistoryQuery = { __typename?: "Query" } & {
  HeroMatches: { __typename?: "PaginatedMatch" } & Pick<PaginatedMatch, "page" | "pages"> & {
      data?: Maybe<Array<{ __typename?: "Match" } & MatchNoPlayersFragmentFragment>>;
    };
};

export type PlayerStatsQueryVariables = Exact<{
  steam_id: Scalars["String"];
}>;

export type PlayerStatsQuery = { __typename?: "Query" } & {
  PlayerStats: { __typename?: "PlayerStatsModel" } & {
    heroes: Array<
      { __typename?: "PlayerStatsDto" } & Pick<
        PlayerStatsDto,
        "denies" | "games" | "gpm" | "kda" | "hero" | "last_hits" | "loss" | "playerSteamId" | "wins" | "xpm"
      >
    >;
    overall: { __typename?: "OverallStats" } & Pick<OverallStats, "wins" | "loss" | "games">;
  };
};

export type PlayerHistoryQueryVariables = Exact<{
  sid: Scalars["String"];
  hero?: Maybe<Scalars["String"]>;
  page: Scalars["Int"];
}>;

export type PlayerHistoryQuery = { __typename?: "Query" } & {
  PlayerHistory: { __typename?: "PaginatedMatch" } & Pick<PaginatedMatch, "page" | "pages"> & {
      data?: Maybe<Array<{ __typename?: "Match" } & FullMatchFragmentFragment>>;
    };
  Player: { __typename?: "Player" } & PlayerFragmentFragment;
};

export type PlayerPageQueryVariables = Exact<{
  steam_id: Scalars["String"];
  page: Scalars["Int"];
}>;

export type PlayerPageQuery = { __typename?: "Query" } & {
  Player: { __typename?: "Player" } & PlayerFragmentFragment;
  PlayerHistory: { __typename?: "PaginatedMatch" } & Pick<PaginatedMatch, "page" | "pages"> & {
      data?: Maybe<Array<{ __typename?: "Match" } & FullMatchFragmentFragment>>;
    };
  PlayerStats: { __typename?: "PlayerStatsModel" } & {
    heroes: Array<
      { __typename?: "PlayerStatsDto" } & Pick<
        PlayerStatsDto,
        "denies" | "games" | "gpm" | "kda" | "hero" | "last_hits" | "loss" | "playerSteamId" | "wins" | "xpm"
      >
    >;
    overall: { __typename?: "OverallStats" } & Pick<OverallStats, "wins" | "loss" | "games">;
  };
};

export type PlayerQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type PlayerQuery = { __typename?: "Query" } & { Player: { __typename?: "Player" } & PlayerFragmentFragment };

export type LadderQueryVariables = Exact<{ [key: string]: never }>;

export type LadderQuery = { __typename?: "Query" } & {
  Ladder: Array<{ __typename?: "Player" } & PlayerFragmentFragment>;
};

export type TeamQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type TeamQuery = { __typename?: "Query" } & { Team: { __typename?: "TeamEntity" } & FullTeamFragmentFragment };

export type TeamsQueryVariables = Exact<{
  page: Scalars["Int"];
}>;

export type TeamsQuery = { __typename?: "Query" } & {
  Teams: { __typename?: "PaginatedTeam" } & Pick<PaginatedTeam, "page" | "pages"> & {
      data?: Maybe<Array<{ __typename?: "TeamEntity" } & FullTeamFragmentFragment>>;
    };
};

export type HeroesQueryVariables = Exact<{ [key: string]: never }>;

export type HeroesQuery = { __typename?: "Query" } & {
  Heroes: Array<
    { __typename?: "HeroSummary" } & Pick<
      HeroSummary,
      "assists" | "deaths" | "games" | "hero" | "kills" | "losses" | "wins"
    >
  >;
};

export type QueuesQueryVariables = Exact<{ [key: string]: never }>;

export type QueuesQuery = { __typename?: "Query" } & {
  Queues: Array<
    { __typename?: "QueueDTO" } & Pick<QueueDto, "mode"> & {
        parties: Array<
          { __typename?: "PartyDTO" } & Pick<PartyDto, "id"> & {
              leader: { __typename?: "QueuePlayerDTO" } & Pick<QueuePlayerDto, "id" | "name" | "realm">;
              players: Array<{ __typename?: "QueuePlayerDTO" } & Pick<QueuePlayerDto, "id" | "name" | "realm">>;
            }
        >;
      }
  >;
};

export type RoomsQueryVariables = Exact<{ [key: string]: never }>;

export type RoomsQuery = { __typename?: "Query" } & {
  Rooms: Array<
    { __typename?: "RoomDTO" } & Pick<RoomDto, "id" | "mode"> & {
        parties: Array<
          { __typename?: "PartyDTO" } & Pick<PartyDto, "id"> & {
              leader: { __typename?: "QueuePlayerDTO" } & Pick<QueuePlayerDto, "name" | "realm" | "id">;
              players: Array<{ __typename?: "QueuePlayerDTO" } & Pick<QueuePlayerDto, "name" | "id" | "realm">>;
            }
        >;
      }
  >;
};

export type GameServersQueryVariables = Exact<{ [key: string]: never }>;

export type GameServersQuery = { __typename?: "Query" } & {
  GameServers: Array<
    { __typename?: "GameServerOperatorDTO" } & Pick<GameServerOperatorDto, "url"> & {
        gameServers: Array<{ __typename?: "GameServersDTO" } & Pick<GameServersDto, "url" | "running" | "mode">>;
      }
  >;
};

export type UsersQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type UsersQuery = { __typename?: "Query" } & {
  Users: Array<
    { __typename?: "User" } & Pick<User, "discord_id"> & { player: { __typename?: "Player" } & PlayerFragmentFragment }
  >;
};

export type TeamInvitesQueryVariables = Exact<{ [key: string]: never }>;

export type TeamInvitesQuery = { __typename?: "Query" } & {
  TeamInvitations: Array<
    { __typename?: "TeamInvitationEntity" } & Pick<TeamInvitationEntity, "id"> & {
        team: { __typename?: "TeamEntity" } & Pick<TeamEntity, "name" | "id"> & {
            image: { __typename?: "ImageEntity" } & Pick<ImageEntity, "id" | "path">;
          };
      }
  >;
};

export type TeamInvitesCountQueryVariables = Exact<{ [key: string]: never }>;

export type TeamInvitesCountQuery = { __typename?: "Query" } & {
  TeamInvitations: Array<{ __typename?: "TeamInvitationEntity" } & Pick<TeamInvitationEntity, "id">>;
};

export type UserQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type UserQuery = { __typename?: "Query" } & {
  User: { __typename?: "User" } & {
    team?: Maybe<{ __typename?: "TeamMemberEntity" } & { team: { __typename?: "TeamEntity" } & SmallTeamFragment }>;
  };
};

export type RestartServerMutationVariables = Exact<{
  url: Scalars["String"];
  mode: MatchmakingMode;
}>;

export type RestartServerMutation = { __typename?: "Mutation" } & {
  RestartServer: Array<
    { __typename?: "GameServerOperatorDTO" } & Pick<GameServerOperatorDto, "url"> & {
        gameServers: Array<{ __typename?: "GameServersDTO" } & Pick<GameServersDto, "url" | "running">>;
      }
  >;
};

export type StartServerMutationVariables = Exact<{
  url: Scalars["String"];
  mode: MatchmakingMode;
}>;

export type StartServerMutation = { __typename?: "Mutation" } & {
  StartServer: Array<
    { __typename?: "GameServerOperatorDTO" } & Pick<GameServerOperatorDto, "url"> & {
        gameServers: Array<{ __typename?: "GameServersDTO" } & Pick<GameServersDto, "url" | "running">>;
      }
  >;
};

export type KillServerMutationVariables = Exact<{
  url: Scalars["String"];
}>;

export type KillServerMutation = { __typename?: "Mutation" } & {
  KillServer: Array<
    { __typename?: "GameServerOperatorDTO" } & Pick<GameServerOperatorDto, "url"> & {
        gameServers: Array<{ __typename?: "GameServersDTO" } & Pick<GameServersDto, "url" | "running">>;
      }
  >;
};

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  tag?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
}>;

export type UpdateTeamMutation = { __typename?: "Mutation" } & {
  updateTeam: { __typename?: "TeamEntity" } & TeamFragmentFragment;
};

export type CreateTeamMutationVariables = Exact<{
  image: Scalars["String"];
  tag: Scalars["String"];
  name: Scalars["String"];
}>;

export type CreateTeamMutation = { __typename?: "Mutation" } & {
  createTeam: { __typename?: "TeamEntity" } & TeamFragmentFragment;
};

export type InvitePlayerMutationVariables = Exact<{
  id: Scalars["Int"];
  uid: Scalars["String"];
}>;

export type InvitePlayerMutation = { __typename?: "Mutation" } & {
  inviteToTeam: { __typename?: "TeamInvitationEntity" } & Pick<TeamInvitationEntity, "id">;
};

export type KickPlayerMutationVariables = Exact<{
  id: Scalars["Int"];
  uid: Scalars["String"];
}>;

export type KickPlayerMutation = { __typename?: "Mutation" } & {
  kickPlayer: { __typename?: "TeamEntity" } & FullTeamFragmentFragment;
};

export type SubmitTeamInvitationMutationVariables = Exact<{
  id: Scalars["Int"];
  accept: Scalars["Boolean"];
}>;

export type SubmitTeamInvitationMutation = { __typename?: "Mutation" } & {
  SubmitInvitation: { __typename?: "TeamEntity" } & Pick<TeamEntity, "name" | "id">;
};

export const PlayerFragmentFragmentDoc = gql`
  fragment PlayerFragment on Player {
    mmr
    steam_id
    name
  }
`;
export const FullTeamFragmentFragmentDoc = gql`
  fragment FullTeamFragment on TeamEntity {
    name
    id
    tag
    image {
      id
      path
    }
    creator {
      discord_id
      steam_id
      player {
        ...PlayerFragment
      }
    }
    members {
      user {
        discord_id
        steam_id
        player {
          ...PlayerFragment
        }
      }
    }
  }
  ${PlayerFragmentFragmentDoc}
`;
export const PlayerInMatchFragmentFragmentDoc = gql`
  fragment PlayerInMatchFragment on PlayerInMatch {
    id
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
`;
export const MatchNoPlayersFragmentFragmentDoc = gql`
  fragment MatchNoPlayersFragment on Match {
    duration
    radiant_win
    timestamp
    id
    type
    players {
      ...PlayerInMatchFragment
    }
  }
  ${PlayerInMatchFragmentFragmentDoc}
`;
export const FullPlayerInMatchFragmentFragmentDoc = gql`
  fragment FullPlayerInMatchFragment on PlayerInMatch {
    player {
      ...PlayerFragment
    }
    id
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
  ${PlayerFragmentFragmentDoc}
`;
export const FullMatchFragmentFragmentDoc = gql`
  fragment FullMatchFragment on Match {
    duration
    id
    radiant_win
    timestamp
    type
    players {
      ...FullPlayerInMatchFragment
    }
  }
  ${FullPlayerInMatchFragmentFragmentDoc}
`;
export const SmallTeamFragmentDoc = gql`
  fragment SmallTeam on TeamEntity {
    name
    id
    tag
    image {
      id
      path
    }
  }
`;
export const TeamFragmentFragmentDoc = gql`
  fragment TeamFragment on TeamEntity {
    name
    id
    image {
      id
    }
    creator {
      player {
        name
      }
    }
    members {
      user {
        player {
          name
        }
      }
    }
  }
`;
export const MatchDocument = gql`
  query match($id: Int!) {
    Match(id: $id) {
      ...FullMatchFragment
    }
  }
  ${FullMatchFragmentFragmentDoc}
`;

/**
 * __useMatchQuery__
 *
 * To run a query within a React component, call `useMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMatchQuery(baseOptions?: Apollo.QueryHookOptions<MatchQuery, MatchQueryVariables>) {
  return Apollo.useQuery<MatchQuery, MatchQueryVariables>(MatchDocument, baseOptions);
}
export function useMatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchQuery, MatchQueryVariables>) {
  return Apollo.useLazyQuery<MatchQuery, MatchQueryVariables>(MatchDocument, baseOptions);
}
export type MatchQueryHookResult = ReturnType<typeof useMatchQuery>;
export type MatchLazyQueryHookResult = ReturnType<typeof useMatchLazyQuery>;
export type MatchQueryResult = Apollo.QueryResult<MatchQuery, MatchQueryVariables>;
export const HistoryDocument = gql`
  query history($page: Int!, $mode: Int) {
    History(mode: $mode, page: $page) {
      data {
        ...MatchNoPlayersFragment
      }
      page
      pages
    }
  }
  ${MatchNoPlayersFragmentFragmentDoc}
`;

/**
 * __useHistoryQuery__
 *
 * To run a query within a React component, call `useHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHistoryQuery({
 *   variables: {
 *      page: // value for 'page'
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useHistoryQuery(baseOptions?: Apollo.QueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
  return Apollo.useQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, baseOptions);
}
export function useHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HistoryQuery, HistoryQueryVariables>) {
  return Apollo.useLazyQuery<HistoryQuery, HistoryQueryVariables>(HistoryDocument, baseOptions);
}
export type HistoryQueryHookResult = ReturnType<typeof useHistoryQuery>;
export type HistoryLazyQueryHookResult = ReturnType<typeof useHistoryLazyQuery>;
export type HistoryQueryResult = Apollo.QueryResult<HistoryQuery, HistoryQueryVariables>;
export const HeroHistoryDocument = gql`
  query heroHistory($page: Int!, $hero: String!) {
    HeroMatches(hero: $hero, page: $page) {
      data {
        ...MatchNoPlayersFragment
      }
      page
      pages
    }
  }
  ${MatchNoPlayersFragmentFragmentDoc}
`;

/**
 * __useHeroHistoryQuery__
 *
 * To run a query within a React component, call `useHeroHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeroHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeroHistoryQuery({
 *   variables: {
 *      page: // value for 'page'
 *      hero: // value for 'hero'
 *   },
 * });
 */
export function useHeroHistoryQuery(
  baseOptions?: Apollo.QueryHookOptions<HeroHistoryQuery, HeroHistoryQueryVariables>
) {
  return Apollo.useQuery<HeroHistoryQuery, HeroHistoryQueryVariables>(HeroHistoryDocument, baseOptions);
}
export function useHeroHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HeroHistoryQuery, HeroHistoryQueryVariables>
) {
  return Apollo.useLazyQuery<HeroHistoryQuery, HeroHistoryQueryVariables>(HeroHistoryDocument, baseOptions);
}
export type HeroHistoryQueryHookResult = ReturnType<typeof useHeroHistoryQuery>;
export type HeroHistoryLazyQueryHookResult = ReturnType<typeof useHeroHistoryLazyQuery>;
export type HeroHistoryQueryResult = Apollo.QueryResult<HeroHistoryQuery, HeroHistoryQueryVariables>;
export const PlayerStatsDocument = gql`
  query playerStats($steam_id: String!) {
    PlayerStats(steam_id: $steam_id) {
      heroes {
        denies
        games
        gpm
        kda
        hero
        last_hits
        loss
        playerSteamId
        wins
        xpm
      }
      overall {
        wins
        loss
        games
      }
    }
  }
`;

/**
 * __usePlayerStatsQuery__
 *
 * To run a query within a React component, call `usePlayerStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerStatsQuery({
 *   variables: {
 *      steam_id: // value for 'steam_id'
 *   },
 * });
 */
export function usePlayerStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<PlayerStatsQuery, PlayerStatsQueryVariables>
) {
  return Apollo.useQuery<PlayerStatsQuery, PlayerStatsQueryVariables>(PlayerStatsDocument, baseOptions);
}
export function usePlayerStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PlayerStatsQuery, PlayerStatsQueryVariables>
) {
  return Apollo.useLazyQuery<PlayerStatsQuery, PlayerStatsQueryVariables>(PlayerStatsDocument, baseOptions);
}
export type PlayerStatsQueryHookResult = ReturnType<typeof usePlayerStatsQuery>;
export type PlayerStatsLazyQueryHookResult = ReturnType<typeof usePlayerStatsLazyQuery>;
export type PlayerStatsQueryResult = Apollo.QueryResult<PlayerStatsQuery, PlayerStatsQueryVariables>;
export const PlayerHistoryDocument = gql`
  query playerHistory($sid: String!, $hero: String, $page: Int!) {
    PlayerHistory(steam_id: $sid, page: $page, hero: $hero) {
      data {
        ...FullMatchFragment
      }
      page
      pages
    }
    Player(steam_id: $sid) {
      ...PlayerFragment
    }
  }
  ${FullMatchFragmentFragmentDoc}
  ${PlayerFragmentFragmentDoc}
`;

/**
 * __usePlayerHistoryQuery__
 *
 * To run a query within a React component, call `usePlayerHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerHistoryQuery({
 *   variables: {
 *      sid: // value for 'sid'
 *      hero: // value for 'hero'
 *      page: // value for 'page'
 *   },
 * });
 */
export function usePlayerHistoryQuery(
  baseOptions?: Apollo.QueryHookOptions<PlayerHistoryQuery, PlayerHistoryQueryVariables>
) {
  return Apollo.useQuery<PlayerHistoryQuery, PlayerHistoryQueryVariables>(PlayerHistoryDocument, baseOptions);
}
export function usePlayerHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PlayerHistoryQuery, PlayerHistoryQueryVariables>
) {
  return Apollo.useLazyQuery<PlayerHistoryQuery, PlayerHistoryQueryVariables>(PlayerHistoryDocument, baseOptions);
}
export type PlayerHistoryQueryHookResult = ReturnType<typeof usePlayerHistoryQuery>;
export type PlayerHistoryLazyQueryHookResult = ReturnType<typeof usePlayerHistoryLazyQuery>;
export type PlayerHistoryQueryResult = Apollo.QueryResult<PlayerHistoryQuery, PlayerHistoryQueryVariables>;
export const PlayerPageDocument = gql`
  query playerPage($steam_id: String!, $page: Int!) {
    Player(steam_id: $steam_id) {
      ...PlayerFragment
    }
    PlayerHistory(steam_id: $steam_id, page: $page) {
      data {
        ...FullMatchFragment
      }
      page
      pages
    }
    PlayerStats(steam_id: $steam_id) {
      heroes {
        denies
        games
        gpm
        kda
        hero
        last_hits
        loss
        playerSteamId
        wins
        xpm
      }
      overall {
        wins
        loss
        games
      }
    }
  }
  ${PlayerFragmentFragmentDoc}
  ${FullMatchFragmentFragmentDoc}
`;

/**
 * __usePlayerPageQuery__
 *
 * To run a query within a React component, call `usePlayerPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerPageQuery({
 *   variables: {
 *      steam_id: // value for 'steam_id'
 *      page: // value for 'page'
 *   },
 * });
 */
export function usePlayerPageQuery(baseOptions?: Apollo.QueryHookOptions<PlayerPageQuery, PlayerPageQueryVariables>) {
  return Apollo.useQuery<PlayerPageQuery, PlayerPageQueryVariables>(PlayerPageDocument, baseOptions);
}
export function usePlayerPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PlayerPageQuery, PlayerPageQueryVariables>
) {
  return Apollo.useLazyQuery<PlayerPageQuery, PlayerPageQueryVariables>(PlayerPageDocument, baseOptions);
}
export type PlayerPageQueryHookResult = ReturnType<typeof usePlayerPageQuery>;
export type PlayerPageLazyQueryHookResult = ReturnType<typeof usePlayerPageLazyQuery>;
export type PlayerPageQueryResult = Apollo.QueryResult<PlayerPageQuery, PlayerPageQueryVariables>;
export const PlayerDocument = gql`
  query player($id: String!) {
    Player(steam_id: $id) {
      ...PlayerFragment
    }
  }
  ${PlayerFragmentFragmentDoc}
`;

/**
 * __usePlayerQuery__
 *
 * To run a query within a React component, call `usePlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlayerQuery(baseOptions?: Apollo.QueryHookOptions<PlayerQuery, PlayerQueryVariables>) {
  return Apollo.useQuery<PlayerQuery, PlayerQueryVariables>(PlayerDocument, baseOptions);
}
export function usePlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerQuery, PlayerQueryVariables>) {
  return Apollo.useLazyQuery<PlayerQuery, PlayerQueryVariables>(PlayerDocument, baseOptions);
}
export type PlayerQueryHookResult = ReturnType<typeof usePlayerQuery>;
export type PlayerLazyQueryHookResult = ReturnType<typeof usePlayerLazyQuery>;
export type PlayerQueryResult = Apollo.QueryResult<PlayerQuery, PlayerQueryVariables>;
export const LadderDocument = gql`
  query ladder {
    Ladder {
      ...PlayerFragment
    }
  }
  ${PlayerFragmentFragmentDoc}
`;

/**
 * __useLadderQuery__
 *
 * To run a query within a React component, call `useLadderQuery` and pass it any options that fit your needs.
 * When your component renders, `useLadderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLadderQuery({
 *   variables: {
 *   },
 * });
 */
export function useLadderQuery(baseOptions?: Apollo.QueryHookOptions<LadderQuery, LadderQueryVariables>) {
  return Apollo.useQuery<LadderQuery, LadderQueryVariables>(LadderDocument, baseOptions);
}
export function useLadderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LadderQuery, LadderQueryVariables>) {
  return Apollo.useLazyQuery<LadderQuery, LadderQueryVariables>(LadderDocument, baseOptions);
}
export type LadderQueryHookResult = ReturnType<typeof useLadderQuery>;
export type LadderLazyQueryHookResult = ReturnType<typeof useLadderLazyQuery>;
export type LadderQueryResult = Apollo.QueryResult<LadderQuery, LadderQueryVariables>;
export const TeamDocument = gql`
  query team($id: Int!) {
    Team(id: $id) {
      ...FullTeamFragment
    }
  }
  ${FullTeamFragmentFragmentDoc}
`;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamQuery(baseOptions?: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
  return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
}
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
  return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
}
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;
export const TeamsDocument = gql`
  query teams($page: Int!) {
    Teams(page: $page) {
      data {
        ...FullTeamFragment
      }
      page
      pages
    }
  }
  ${FullTeamFragmentFragmentDoc}
`;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
  return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
}
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
  return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
}
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const HeroesDocument = gql`
  query heroes {
    Heroes {
      assists
      deaths
      games
      hero
      kills
      losses
      wins
    }
  }
`;

/**
 * __useHeroesQuery__
 *
 * To run a query within a React component, call `useHeroesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeroesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeroesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHeroesQuery(baseOptions?: Apollo.QueryHookOptions<HeroesQuery, HeroesQueryVariables>) {
  return Apollo.useQuery<HeroesQuery, HeroesQueryVariables>(HeroesDocument, baseOptions);
}
export function useHeroesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeroesQuery, HeroesQueryVariables>) {
  return Apollo.useLazyQuery<HeroesQuery, HeroesQueryVariables>(HeroesDocument, baseOptions);
}
export type HeroesQueryHookResult = ReturnType<typeof useHeroesQuery>;
export type HeroesLazyQueryHookResult = ReturnType<typeof useHeroesLazyQuery>;
export type HeroesQueryResult = Apollo.QueryResult<HeroesQuery, HeroesQueryVariables>;
export const QueuesDocument = gql`
  query queues {
    Queues {
      mode
      parties {
        id
        leader {
          id
          name
          realm
        }
        players {
          id
          name
          realm
        }
      }
    }
  }
`;

/**
 * __useQueuesQuery__
 *
 * To run a query within a React component, call `useQueuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueuesQuery(baseOptions?: Apollo.QueryHookOptions<QueuesQuery, QueuesQueryVariables>) {
  return Apollo.useQuery<QueuesQuery, QueuesQueryVariables>(QueuesDocument, baseOptions);
}
export function useQueuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueuesQuery, QueuesQueryVariables>) {
  return Apollo.useLazyQuery<QueuesQuery, QueuesQueryVariables>(QueuesDocument, baseOptions);
}
export type QueuesQueryHookResult = ReturnType<typeof useQueuesQuery>;
export type QueuesLazyQueryHookResult = ReturnType<typeof useQueuesLazyQuery>;
export type QueuesQueryResult = Apollo.QueryResult<QueuesQuery, QueuesQueryVariables>;
export const RoomsDocument = gql`
  query rooms {
    Rooms {
      id
      mode
      parties {
        id
        leader {
          name
          realm
          id
        }
        players {
          name
          id
          realm
        }
      }
    }
  }
`;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
  return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
}
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
  return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
}
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;
export const GameServersDocument = gql`
  query gameServers {
    GameServers {
      gameServers {
        url
        running
        mode
      }
      url
    }
  }
`;

/**
 * __useGameServersQuery__
 *
 * To run a query within a React component, call `useGameServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameServersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGameServersQuery(
  baseOptions?: Apollo.QueryHookOptions<GameServersQuery, GameServersQueryVariables>
) {
  return Apollo.useQuery<GameServersQuery, GameServersQueryVariables>(GameServersDocument, baseOptions);
}
export function useGameServersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GameServersQuery, GameServersQueryVariables>
) {
  return Apollo.useLazyQuery<GameServersQuery, GameServersQueryVariables>(GameServersDocument, baseOptions);
}
export type GameServersQueryHookResult = ReturnType<typeof useGameServersQuery>;
export type GameServersLazyQueryHookResult = ReturnType<typeof useGameServersLazyQuery>;
export type GameServersQueryResult = Apollo.QueryResult<GameServersQuery, GameServersQueryVariables>;
export const UsersDocument = gql`
  query users($name: String!) {
    Users(name: $name) {
      discord_id
      player {
        ...PlayerFragment
      }
    }
  }
  ${PlayerFragmentFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const TeamInvitesDocument = gql`
  query teamInvites {
    TeamInvitations {
      id
      team {
        name
        image {
          id
          path
        }
        id
      }
    }
  }
`;

/**
 * __useTeamInvitesQuery__
 *
 * To run a query within a React component, call `useTeamInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamInvitesQuery(
  baseOptions?: Apollo.QueryHookOptions<TeamInvitesQuery, TeamInvitesQueryVariables>
) {
  return Apollo.useQuery<TeamInvitesQuery, TeamInvitesQueryVariables>(TeamInvitesDocument, baseOptions);
}
export function useTeamInvitesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TeamInvitesQuery, TeamInvitesQueryVariables>
) {
  return Apollo.useLazyQuery<TeamInvitesQuery, TeamInvitesQueryVariables>(TeamInvitesDocument, baseOptions);
}
export type TeamInvitesQueryHookResult = ReturnType<typeof useTeamInvitesQuery>;
export type TeamInvitesLazyQueryHookResult = ReturnType<typeof useTeamInvitesLazyQuery>;
export type TeamInvitesQueryResult = Apollo.QueryResult<TeamInvitesQuery, TeamInvitesQueryVariables>;
export const TeamInvitesCountDocument = gql`
  query teamInvitesCount {
    TeamInvitations {
      id
    }
  }
`;

/**
 * __useTeamInvitesCountQuery__
 *
 * To run a query within a React component, call `useTeamInvitesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamInvitesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamInvitesCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamInvitesCountQuery(
  baseOptions?: Apollo.QueryHookOptions<TeamInvitesCountQuery, TeamInvitesCountQueryVariables>
) {
  return Apollo.useQuery<TeamInvitesCountQuery, TeamInvitesCountQueryVariables>(TeamInvitesCountDocument, baseOptions);
}
export function useTeamInvitesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TeamInvitesCountQuery, TeamInvitesCountQueryVariables>
) {
  return Apollo.useLazyQuery<TeamInvitesCountQuery, TeamInvitesCountQueryVariables>(
    TeamInvitesCountDocument,
    baseOptions
  );
}
export type TeamInvitesCountQueryHookResult = ReturnType<typeof useTeamInvitesCountQuery>;
export type TeamInvitesCountLazyQueryHookResult = ReturnType<typeof useTeamInvitesCountLazyQuery>;
export type TeamInvitesCountQueryResult = Apollo.QueryResult<TeamInvitesCountQuery, TeamInvitesCountQueryVariables>;
export const UserDocument = gql`
  query user($id: String!) {
    User(id: $id) {
      team {
        team {
          ...SmallTeam
        }
      }
    }
  }
  ${SmallTeamFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
}
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const RestartServerDocument = gql`
  mutation restartServer($url: String!, $mode: MatchmakingMode!) {
    RestartServer(mode: $mode, url: $url) {
      url
      gameServers {
        url
        running
      }
    }
  }
`;
export type RestartServerMutationFn = Apollo.MutationFunction<RestartServerMutation, RestartServerMutationVariables>;

/**
 * __useRestartServerMutation__
 *
 * To run a mutation, you first call `useRestartServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestartServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restartServerMutation, { data, loading, error }] = useRestartServerMutation({
 *   variables: {
 *      url: // value for 'url'
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useRestartServerMutation(
  baseOptions?: Apollo.MutationHookOptions<RestartServerMutation, RestartServerMutationVariables>
) {
  return Apollo.useMutation<RestartServerMutation, RestartServerMutationVariables>(RestartServerDocument, baseOptions);
}
export type RestartServerMutationHookResult = ReturnType<typeof useRestartServerMutation>;
export type RestartServerMutationResult = Apollo.MutationResult<RestartServerMutation>;
export type RestartServerMutationOptions = Apollo.BaseMutationOptions<
  RestartServerMutation,
  RestartServerMutationVariables
>;
export const StartServerDocument = gql`
  mutation startServer($url: String!, $mode: MatchmakingMode!) {
    StartServer(mode: $mode, url: $url) {
      url
      gameServers {
        url
        running
      }
    }
  }
`;
export type StartServerMutationFn = Apollo.MutationFunction<StartServerMutation, StartServerMutationVariables>;

/**
 * __useStartServerMutation__
 *
 * To run a mutation, you first call `useStartServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startServerMutation, { data, loading, error }] = useStartServerMutation({
 *   variables: {
 *      url: // value for 'url'
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useStartServerMutation(
  baseOptions?: Apollo.MutationHookOptions<StartServerMutation, StartServerMutationVariables>
) {
  return Apollo.useMutation<StartServerMutation, StartServerMutationVariables>(StartServerDocument, baseOptions);
}
export type StartServerMutationHookResult = ReturnType<typeof useStartServerMutation>;
export type StartServerMutationResult = Apollo.MutationResult<StartServerMutation>;
export type StartServerMutationOptions = Apollo.BaseMutationOptions<StartServerMutation, StartServerMutationVariables>;
export const KillServerDocument = gql`
  mutation killServer($url: String!) {
    KillServer(url: $url) {
      url
      gameServers {
        url
        running
      }
    }
  }
`;
export type KillServerMutationFn = Apollo.MutationFunction<KillServerMutation, KillServerMutationVariables>;

/**
 * __useKillServerMutation__
 *
 * To run a mutation, you first call `useKillServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKillServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [killServerMutation, { data, loading, error }] = useKillServerMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useKillServerMutation(
  baseOptions?: Apollo.MutationHookOptions<KillServerMutation, KillServerMutationVariables>
) {
  return Apollo.useMutation<KillServerMutation, KillServerMutationVariables>(KillServerDocument, baseOptions);
}
export type KillServerMutationHookResult = ReturnType<typeof useKillServerMutation>;
export type KillServerMutationResult = Apollo.MutationResult<KillServerMutation>;
export type KillServerMutationOptions = Apollo.BaseMutationOptions<KillServerMutation, KillServerMutationVariables>;
export const UpdateTeamDocument = gql`
  mutation updateTeam($id: Int!, $name: String, $tag: String, $image: String) {
    updateTeam(id: $id, image: $image, name: $name, tag: $tag) {
      ...TeamFragment
    }
  }
  ${TeamFragmentFragmentDoc}
`;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      tag: // value for 'tag'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>
) {
  return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, baseOptions);
}
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const CreateTeamDocument = gql`
  mutation createTeam($image: String!, $tag: String!, $name: String!) {
    createTeam(image: $image, tag: $tag, name: $name) {
      ...TeamFragment
    }
  }
  ${TeamFragmentFragmentDoc}
`;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      image: // value for 'image'
 *      tag: // value for 'tag'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>
) {
  return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
}
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const InvitePlayerDocument = gql`
  mutation invitePlayer($id: Int!, $uid: String!) {
    inviteToTeam(id: $id, uid: $uid) {
      id
    }
  }
`;
export type InvitePlayerMutationFn = Apollo.MutationFunction<InvitePlayerMutation, InvitePlayerMutationVariables>;

/**
 * __useInvitePlayerMutation__
 *
 * To run a mutation, you first call `useInvitePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvitePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invitePlayerMutation, { data, loading, error }] = useInvitePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useInvitePlayerMutation(
  baseOptions?: Apollo.MutationHookOptions<InvitePlayerMutation, InvitePlayerMutationVariables>
) {
  return Apollo.useMutation<InvitePlayerMutation, InvitePlayerMutationVariables>(InvitePlayerDocument, baseOptions);
}
export type InvitePlayerMutationHookResult = ReturnType<typeof useInvitePlayerMutation>;
export type InvitePlayerMutationResult = Apollo.MutationResult<InvitePlayerMutation>;
export type InvitePlayerMutationOptions = Apollo.BaseMutationOptions<
  InvitePlayerMutation,
  InvitePlayerMutationVariables
>;
export const KickPlayerDocument = gql`
  mutation kickPlayer($id: Int!, $uid: String!) {
    kickPlayer(id: $id, uid: $uid) {
      ...FullTeamFragment
    }
  }
  ${FullTeamFragmentFragmentDoc}
`;
export type KickPlayerMutationFn = Apollo.MutationFunction<KickPlayerMutation, KickPlayerMutationVariables>;

/**
 * __useKickPlayerMutation__
 *
 * To run a mutation, you first call `useKickPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickPlayerMutation, { data, loading, error }] = useKickPlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useKickPlayerMutation(
  baseOptions?: Apollo.MutationHookOptions<KickPlayerMutation, KickPlayerMutationVariables>
) {
  return Apollo.useMutation<KickPlayerMutation, KickPlayerMutationVariables>(KickPlayerDocument, baseOptions);
}
export type KickPlayerMutationHookResult = ReturnType<typeof useKickPlayerMutation>;
export type KickPlayerMutationResult = Apollo.MutationResult<KickPlayerMutation>;
export type KickPlayerMutationOptions = Apollo.BaseMutationOptions<KickPlayerMutation, KickPlayerMutationVariables>;
export const SubmitTeamInvitationDocument = gql`
  mutation submitTeamInvitation($id: Int!, $accept: Boolean!) {
    SubmitInvitation(id: $id, accept: $accept) {
      name
      id
    }
  }
`;
export type SubmitTeamInvitationMutationFn = Apollo.MutationFunction<
  SubmitTeamInvitationMutation,
  SubmitTeamInvitationMutationVariables
>;

/**
 * __useSubmitTeamInvitationMutation__
 *
 * To run a mutation, you first call `useSubmitTeamInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitTeamInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitTeamInvitationMutation, { data, loading, error }] = useSubmitTeamInvitationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      accept: // value for 'accept'
 *   },
 * });
 */
export function useSubmitTeamInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<SubmitTeamInvitationMutation, SubmitTeamInvitationMutationVariables>
) {
  return Apollo.useMutation<SubmitTeamInvitationMutation, SubmitTeamInvitationMutationVariables>(
    SubmitTeamInvitationDocument,
    baseOptions
  );
}
export type SubmitTeamInvitationMutationHookResult = ReturnType<typeof useSubmitTeamInvitationMutation>;
export type SubmitTeamInvitationMutationResult = Apollo.MutationResult<SubmitTeamInvitationMutation>;
export type SubmitTeamInvitationMutationOptions = Apollo.BaseMutationOptions<
  SubmitTeamInvitationMutation,
  SubmitTeamInvitationMutationVariables
>;
