/* tslint:disable */
/* eslint-disable */
/**
 * Public REST api for dota2classic
 * All stuff
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import useSWR, { ConfigInterface } from "swr";

import {
  BracketDto,
  BracketDtoFromJSON,
  BracketDtoToJSON,
  CompactTeamDto,
  CompactTeamDtoFromJSON,
  CompactTeamDtoToJSON,
  FullTournamentDto,
  FullTournamentDtoFromJSON,
  FullTournamentDtoToJSON,
  TournamentDto,
  TournamentDtoFromJSON,
  TournamentDtoToJSON,
  TournamentMatchDto,
  TournamentMatchDtoFromJSON,
  TournamentMatchDtoToJSON
} from "../models";

export interface TournamentControllerGetBracketRequest {
  id: number;
}

export interface TournamentControllerGetTournamentRequest {
  id: number;
}

export interface TournamentControllerJoinTournamentAsPlayerRequest {
  id: number;
}

export interface TournamentControllerLeaveTournamentAsPlayerRequest {
  id: number;
}

export interface TournamentControllerTournamentMatchRequest {
  id: number;
}

export interface TournamentControllerTournamentTeamsRequest {
  id: number;
}

/**
 *
 */
export class TournamentApi extends runtime.BaseAPI {
  /**
   */
  private async tournamentControllerGetBracketRaw(
    requestParameters: TournamentControllerGetBracketRequest
  ): Promise<runtime.ApiResponse<BracketDto>> {
    this.tournamentControllerGetBracketValidation(requestParameters);
    const context = this.tournamentControllerGetBracketContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => BracketDtoFromJSON(jsonValue));
  }

  /**
   */
  private tournamentControllerGetBracketValidation(requestParameters: TournamentControllerGetBracketRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling tournamentControllerGetBracket."
      );
    }
  }

  /**
   */
  tournamentControllerGetBracketContext(requestParameters: TournamentControllerGetBracketRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/tournament/bracket/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  tournamentControllerGetBracket = async (id: number): Promise<BracketDto> => {
    const response = await this.tournamentControllerGetBracketRaw({ id: id });
    return await response.value();
  };

  useTournamentControllerGetBracket(id: number, config?: ConfigInterface<BracketDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.tournamentControllerGetBracketContext({ id: id! });
    return useSWR(JSON.stringify(context), valid ? () => this.tournamentControllerGetBracket(id!) : undefined, config);
  }

  /**
   */
  private async tournamentControllerGetTournamentRaw(
    requestParameters: TournamentControllerGetTournamentRequest
  ): Promise<runtime.ApiResponse<FullTournamentDto>> {
    this.tournamentControllerGetTournamentValidation(requestParameters);
    const context = this.tournamentControllerGetTournamentContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => FullTournamentDtoFromJSON(jsonValue));
  }

  /**
   */
  private tournamentControllerGetTournamentValidation(requestParameters: TournamentControllerGetTournamentRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling tournamentControllerGetTournament."
      );
    }
  }

  /**
   */
  tournamentControllerGetTournamentContext(
    requestParameters: TournamentControllerGetTournamentRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = typeof token === "function" ? token("bearer", []) : token;

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    return {
      path: `/v1/tournament/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  tournamentControllerGetTournament = async (id: number): Promise<FullTournamentDto> => {
    const response = await this.tournamentControllerGetTournamentRaw({ id: id });
    return await response.value();
  };

  useTournamentControllerGetTournament(id: number, config?: ConfigInterface<FullTournamentDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.tournamentControllerGetTournamentContext({ id: id! });
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.tournamentControllerGetTournament(id!) : undefined,
      config
    );
  }

  /**
   */
  private async tournamentControllerJoinTournamentAsPlayerRaw(
    requestParameters: TournamentControllerJoinTournamentAsPlayerRequest
  ): Promise<runtime.ApiResponse<void>> {
    this.tournamentControllerJoinTournamentAsPlayerValidation(requestParameters);
    const context = this.tournamentControllerJoinTournamentAsPlayerContext(requestParameters);
    const response = await this.request(context);

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  private tournamentControllerJoinTournamentAsPlayerValidation(
    requestParameters: TournamentControllerJoinTournamentAsPlayerRequest
  ) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling tournamentControllerJoinTournamentAsPlayer."
      );
    }
  }

  /**
   */
  tournamentControllerJoinTournamentAsPlayerContext(
    requestParameters: TournamentControllerJoinTournamentAsPlayerRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = typeof token === "function" ? token("bearer", []) : token;

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    return {
      path: `/v1/tournament/join_as_player/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "POST",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  tournamentControllerJoinTournamentAsPlayer = async (id: number): Promise<void> => {
    await this.tournamentControllerJoinTournamentAsPlayerRaw({ id: id });
  };

  /**
   */
  private async tournamentControllerLeaveTournamentAsPlayerRaw(
    requestParameters: TournamentControllerLeaveTournamentAsPlayerRequest
  ): Promise<runtime.ApiResponse<void>> {
    this.tournamentControllerLeaveTournamentAsPlayerValidation(requestParameters);
    const context = this.tournamentControllerLeaveTournamentAsPlayerContext(requestParameters);
    const response = await this.request(context);

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  private tournamentControllerLeaveTournamentAsPlayerValidation(
    requestParameters: TournamentControllerLeaveTournamentAsPlayerRequest
  ) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling tournamentControllerLeaveTournamentAsPlayer."
      );
    }
  }

  /**
   */
  tournamentControllerLeaveTournamentAsPlayerContext(
    requestParameters: TournamentControllerLeaveTournamentAsPlayerRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = typeof token === "function" ? token("bearer", []) : token;

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    return {
      path: `/v1/tournament/leave_as_player/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "POST",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  tournamentControllerLeaveTournamentAsPlayer = async (id: number): Promise<void> => {
    await this.tournamentControllerLeaveTournamentAsPlayerRaw({ id: id });
  };

  /**
   */
  private async tournamentControllerListTournamentsRaw(): Promise<runtime.ApiResponse<Array<TournamentDto>>> {
    this.tournamentControllerListTournamentsValidation();
    const context = this.tournamentControllerListTournamentsContext();
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => jsonValue.map(TournamentDtoFromJSON));
  }

  /**
   */
  private tournamentControllerListTournamentsValidation() {}

  /**
   */
  tournamentControllerListTournamentsContext(): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/tournament/list`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  tournamentControllerListTournaments = async (): Promise<Array<TournamentDto>> => {
    const response = await this.tournamentControllerListTournamentsRaw();
    return await response.value();
  };

  useTournamentControllerListTournaments(config?: ConfigInterface<Array<TournamentDto>, Error>) {
    let valid = true;

    const context = this.tournamentControllerListTournamentsContext();
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.tournamentControllerListTournaments() : undefined,
      config
    );
  }

  /**
   */
  private async tournamentControllerTournamentMatchRaw(
    requestParameters: TournamentControllerTournamentMatchRequest
  ): Promise<runtime.ApiResponse<TournamentMatchDto>> {
    this.tournamentControllerTournamentMatchValidation(requestParameters);
    const context = this.tournamentControllerTournamentMatchContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => TournamentMatchDtoFromJSON(jsonValue));
  }

  /**
   */
  private tournamentControllerTournamentMatchValidation(requestParameters: TournamentControllerTournamentMatchRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling tournamentControllerTournamentMatch."
      );
    }
  }

  /**
   */
  tournamentControllerTournamentMatchContext(
    requestParameters: TournamentControllerTournamentMatchRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = typeof token === "function" ? token("bearer", []) : token;

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    return {
      path: `/v1/tournament/tournament_match/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  tournamentControllerTournamentMatch = async (id: number): Promise<TournamentMatchDto> => {
    const response = await this.tournamentControllerTournamentMatchRaw({ id: id });
    return await response.value();
  };

  useTournamentControllerTournamentMatch(id: number, config?: ConfigInterface<TournamentMatchDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.tournamentControllerTournamentMatchContext({ id: id! });
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.tournamentControllerTournamentMatch(id!) : undefined,
      config
    );
  }

  /**
   */
  private async tournamentControllerTournamentTeamsRaw(
    requestParameters: TournamentControllerTournamentTeamsRequest
  ): Promise<runtime.ApiResponse<Array<CompactTeamDto>>> {
    this.tournamentControllerTournamentTeamsValidation(requestParameters);
    const context = this.tournamentControllerTournamentTeamsContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => jsonValue.map(CompactTeamDtoFromJSON));
  }

  /**
   */
  private tournamentControllerTournamentTeamsValidation(requestParameters: TournamentControllerTournamentTeamsRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling tournamentControllerTournamentTeams."
      );
    }
  }

  /**
   */
  tournamentControllerTournamentTeamsContext(
    requestParameters: TournamentControllerTournamentTeamsRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/tournament/teams/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  tournamentControllerTournamentTeams = async (id: number): Promise<Array<CompactTeamDto>> => {
    const response = await this.tournamentControllerTournamentTeamsRaw({ id: id });
    return await response.value();
  };

  useTournamentControllerTournamentTeams(id: number, config?: ConfigInterface<Array<CompactTeamDto>, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.tournamentControllerTournamentTeamsContext({ id: id! });
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.tournamentControllerTournamentTeams(id!) : undefined,
      config
    );
  }
}