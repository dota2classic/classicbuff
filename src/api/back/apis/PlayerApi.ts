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
  HeroStatsDto,
  HeroStatsDtoFromJSON,
  HeroStatsDtoToJSON,
  LeaderboardEntryDto,
  LeaderboardEntryDtoFromJSON,
  LeaderboardEntryDtoToJSON,
  MeDto,
  MeDtoFromJSON,
  MeDtoToJSON,
  MyProfileDto,
  MyProfileDtoFromJSON,
  MyProfileDtoToJSON,
  PartyDto,
  PartyDtoFromJSON,
  PartyDtoToJSON,
  PlayerGeneralStatsDto,
  PlayerGeneralStatsDtoFromJSON,
  PlayerGeneralStatsDtoToJSON,
  PlayerPreviewDto,
  PlayerPreviewDtoFromJSON,
  PlayerPreviewDtoToJSON,
  PlayerSummaryDto,
  PlayerSummaryDtoFromJSON,
  PlayerSummaryDtoToJSON,
  ReportDto,
  ReportDtoFromJSON,
  ReportDtoToJSON
} from "../models";

export interface PlayerControllerGeneralSummaryRequest {
  id: string;
}

export interface PlayerControllerHeroSummaryRequest {
  id: string;
}

export interface PlayerControllerLeaderboardRequest {
  version?: string;
}

export interface PlayerControllerPlayerSummaryRequest {
  id: string;
}

export interface PlayerControllerReportPlayerRequest {
  reportDto: ReportDto;
}

export interface PlayerControllerSearchRequest {
  name: string;
}

/**
 *
 */
export class PlayerApi extends runtime.BaseAPI {
  /**
   */
  private async playerControllerConnectionsRaw(): Promise<runtime.ApiResponse<MyProfileDto>> {
    this.playerControllerConnectionsValidation();
    const context = this.playerControllerConnectionsContext();
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => MyProfileDtoFromJSON(jsonValue));
  }

  /**
   */
  private playerControllerConnectionsValidation() {}

  /**
   */
  playerControllerConnectionsContext(): runtime.RequestOpts {
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
      path: `/v1/player/connections`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerConnections = async (): Promise<MyProfileDto> => {
    const response = await this.playerControllerConnectionsRaw();
    return await response.value();
  };

  usePlayerControllerConnections(config?: ConfigInterface<MyProfileDto, Error>) {
    let valid = true;

    const context = this.playerControllerConnectionsContext();
    return useSWR(JSON.stringify(context), valid ? () => this.playerControllerConnections() : undefined, config);
  }

  /**
   */
  private async playerControllerGeneralSummaryRaw(
    requestParameters: PlayerControllerGeneralSummaryRequest
  ): Promise<runtime.ApiResponse<PlayerGeneralStatsDto>> {
    this.playerControllerGeneralSummaryValidation(requestParameters);
    const context = this.playerControllerGeneralSummaryContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => PlayerGeneralStatsDtoFromJSON(jsonValue));
  }

  /**
   */
  private playerControllerGeneralSummaryValidation(requestParameters: PlayerControllerGeneralSummaryRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling playerControllerGeneralSummary."
      );
    }
  }

  /**
   */
  playerControllerGeneralSummaryContext(requestParameters: PlayerControllerGeneralSummaryRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/player/summary/general/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerGeneralSummary = async (id: string): Promise<PlayerGeneralStatsDto> => {
    const response = await this.playerControllerGeneralSummaryRaw({ id: id });
    return await response.value();
  };

  usePlayerControllerGeneralSummary(id: string, config?: ConfigInterface<PlayerGeneralStatsDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.playerControllerGeneralSummaryContext({ id: id! });
    return useSWR(JSON.stringify(context), valid ? () => this.playerControllerGeneralSummary(id!) : undefined, config);
  }

  /**
   */
  private async playerControllerHeroSummaryRaw(
    requestParameters: PlayerControllerHeroSummaryRequest
  ): Promise<runtime.ApiResponse<Array<HeroStatsDto>>> {
    this.playerControllerHeroSummaryValidation(requestParameters);
    const context = this.playerControllerHeroSummaryContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => jsonValue.map(HeroStatsDtoFromJSON));
  }

  /**
   */
  private playerControllerHeroSummaryValidation(requestParameters: PlayerControllerHeroSummaryRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling playerControllerHeroSummary."
      );
    }
  }

  /**
   */
  playerControllerHeroSummaryContext(requestParameters: PlayerControllerHeroSummaryRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/player/summary/hero/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerHeroSummary = async (id: string): Promise<Array<HeroStatsDto>> => {
    const response = await this.playerControllerHeroSummaryRaw({ id: id });
    return await response.value();
  };

  usePlayerControllerHeroSummary(id: string, config?: ConfigInterface<Array<HeroStatsDto>, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.playerControllerHeroSummaryContext({ id: id! });
    return useSWR(JSON.stringify(context), valid ? () => this.playerControllerHeroSummary(id!) : undefined, config);
  }

  /**
   */
  private async playerControllerLeaderboardRaw(
    requestParameters: PlayerControllerLeaderboardRequest
  ): Promise<runtime.ApiResponse<Array<LeaderboardEntryDto>>> {
    this.playerControllerLeaderboardValidation(requestParameters);
    const context = this.playerControllerLeaderboardContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => jsonValue.map(LeaderboardEntryDtoFromJSON));
  }

  /**
   */
  private playerControllerLeaderboardValidation(requestParameters: PlayerControllerLeaderboardRequest) {}

  /**
   */
  playerControllerLeaderboardContext(requestParameters: PlayerControllerLeaderboardRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    if (requestParameters.version !== undefined) {
      queryParameters["version"] = requestParameters.version;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/player/leaderboard`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerLeaderboard = async (version?: string): Promise<Array<LeaderboardEntryDto>> => {
    const response = await this.playerControllerLeaderboardRaw({ version: version });
    return await response.value();
  };

  usePlayerControllerLeaderboard(version?: string, config?: ConfigInterface<Array<LeaderboardEntryDto>, Error>) {
    let valid = true;

    const context = this.playerControllerLeaderboardContext({ version: version! });
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.playerControllerLeaderboard(version!) : undefined,
      config
    );
  }

  /**
   */
  private async playerControllerMeRaw(): Promise<runtime.ApiResponse<MeDto>> {
    this.playerControllerMeValidation();
    const context = this.playerControllerMeContext();
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => MeDtoFromJSON(jsonValue));
  }

  /**
   */
  private playerControllerMeValidation() {}

  /**
   */
  playerControllerMeContext(): runtime.RequestOpts {
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
      path: `/v1/player/me`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerMe = async (): Promise<MeDto> => {
    const response = await this.playerControllerMeRaw();
    return await response.value();
  };

  usePlayerControllerMe(config?: ConfigInterface<MeDto, Error>) {
    let valid = true;

    const context = this.playerControllerMeContext();
    return useSWR(JSON.stringify(context), valid ? () => this.playerControllerMe() : undefined, config);
  }

  /**
   */
  private async playerControllerMyPartyRaw(): Promise<runtime.ApiResponse<PartyDto>> {
    this.playerControllerMyPartyValidation();
    const context = this.playerControllerMyPartyContext();
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => PartyDtoFromJSON(jsonValue));
  }

  /**
   */
  private playerControllerMyPartyValidation() {}

  /**
   */
  playerControllerMyPartyContext(): runtime.RequestOpts {
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
      path: `/v1/player/party`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerMyParty = async (): Promise<PartyDto> => {
    const response = await this.playerControllerMyPartyRaw();
    return await response.value();
  };

  usePlayerControllerMyParty(config?: ConfigInterface<PartyDto, Error>) {
    let valid = true;

    const context = this.playerControllerMyPartyContext();
    return useSWR(JSON.stringify(context), valid ? () => this.playerControllerMyParty() : undefined, config);
  }

  /**
   */
  private async playerControllerPlayerSummaryRaw(
    requestParameters: PlayerControllerPlayerSummaryRequest
  ): Promise<runtime.ApiResponse<PlayerSummaryDto>> {
    this.playerControllerPlayerSummaryValidation(requestParameters);
    const context = this.playerControllerPlayerSummaryContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => PlayerSummaryDtoFromJSON(jsonValue));
  }

  /**
   */
  private playerControllerPlayerSummaryValidation(requestParameters: PlayerControllerPlayerSummaryRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling playerControllerPlayerSummary."
      );
    }
  }

  /**
   */
  playerControllerPlayerSummaryContext(requestParameters: PlayerControllerPlayerSummaryRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/player/summary/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerPlayerSummary = async (id: string): Promise<PlayerSummaryDto> => {
    const response = await this.playerControllerPlayerSummaryRaw({ id: id });
    return await response.value();
  };

  usePlayerControllerPlayerSummary(id: string, config?: ConfigInterface<PlayerSummaryDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.playerControllerPlayerSummaryContext({ id: id! });
    return useSWR(JSON.stringify(context), valid ? () => this.playerControllerPlayerSummary(id!) : undefined, config);
  }

  /**
   */
  private async playerControllerReportPlayerRaw(
    requestParameters: PlayerControllerReportPlayerRequest
  ): Promise<runtime.ApiResponse<boolean>> {
    this.playerControllerReportPlayerValidation(requestParameters);
    const context = this.playerControllerReportPlayerContext(requestParameters);
    const response = await this.request(context);

    return new runtime.TextApiResponse(response) as any;
  }

  /**
   */
  private playerControllerReportPlayerValidation(requestParameters: PlayerControllerReportPlayerRequest) {
    if (requestParameters.reportDto === null || requestParameters.reportDto === undefined) {
      throw new runtime.RequiredError(
        "reportDto",
        "Required parameter requestParameters.reportDto was null or undefined when calling playerControllerReportPlayer."
      );
    }
  }

  /**
   */
  playerControllerReportPlayerContext(requestParameters: PlayerControllerReportPlayerRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = typeof token === "function" ? token("bearer", []) : token;

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    return {
      path: `/v1/player/report`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: ReportDtoToJSON(requestParameters.reportDto)
    };
  }

  /**
   */
  playerControllerReportPlayer = async (reportDto: ReportDto): Promise<boolean> => {
    const response = await this.playerControllerReportPlayerRaw({ reportDto: reportDto });
    return await response.value();
  };

  /**
   */
  private async playerControllerSearchRaw(
    requestParameters: PlayerControllerSearchRequest
  ): Promise<runtime.ApiResponse<Array<PlayerPreviewDto>>> {
    this.playerControllerSearchValidation(requestParameters);
    const context = this.playerControllerSearchContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => jsonValue.map(PlayerPreviewDtoFromJSON));
  }

  /**
   */
  private playerControllerSearchValidation(requestParameters: PlayerControllerSearchRequest) {
    if (requestParameters.name === null || requestParameters.name === undefined) {
      throw new runtime.RequiredError(
        "name",
        "Required parameter requestParameters.name was null or undefined when calling playerControllerSearch."
      );
    }
  }

  /**
   */
  playerControllerSearchContext(requestParameters: PlayerControllerSearchRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    if (requestParameters.name !== undefined) {
      queryParameters["name"] = requestParameters.name;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/player/search`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerSearch = async (name: string): Promise<Array<PlayerPreviewDto>> => {
    const response = await this.playerControllerSearchRaw({ name: name });
    return await response.value();
  };

  usePlayerControllerSearch(name: string, config?: ConfigInterface<Array<PlayerPreviewDto>, Error>) {
    let valid = true;

    if (name === null || name === undefined || Number.isNaN(name)) {
      valid = false;
    }

    const context = this.playerControllerSearchContext({ name: name! });
    return useSWR(JSON.stringify(context), valid ? () => this.playerControllerSearch(name!) : undefined, config);
  }

  /**
   */
  private async playerControllerUploadImageRaw(): Promise<runtime.ApiResponse<object>> {
    this.playerControllerUploadImageValidation();
    const context = this.playerControllerUploadImageContext();
    const response = await this.request(context);

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   */
  private playerControllerUploadImageValidation() {}

  /**
   */
  playerControllerUploadImageContext(): runtime.RequestOpts {
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
      path: `/v1/player/upload`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  playerControllerUploadImage = async (): Promise<object> => {
    const response = await this.playerControllerUploadImageRaw();
    return await response.value();
  };
}
