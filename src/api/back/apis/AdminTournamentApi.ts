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
  CreateTournamentDto,
  CreateTournamentDtoFromJSON,
  CreateTournamentDtoToJSON,
  ForfeitDto,
  ForfeitDtoFromJSON,
  ForfeitDtoToJSON,
  ScheduleTournamentMatchDto,
  ScheduleTournamentMatchDtoFromJSON,
  ScheduleTournamentMatchDtoToJSON,
  SetWinnerDto,
  SetWinnerDtoFromJSON,
  SetWinnerDtoToJSON,
  StartTournamentDto,
  StartTournamentDtoFromJSON,
  StartTournamentDtoToJSON,
  TournamentBracketMatchDto,
  TournamentBracketMatchDtoFromJSON,
  TournamentBracketMatchDtoToJSON,
  TournamentDto,
  TournamentDtoFromJSON,
  TournamentDtoToJSON
} from "../models";

export interface AdminTournamentControllerCancelTournamentRequest {
  startTournamentDto: StartTournamentDto;
}

export interface AdminTournamentControllerCreateTournamentRequest {
  createTournamentDto: CreateTournamentDto;
}

export interface AdminTournamentControllerForfeitRequest {
  id: number;
  forfeitDto: ForfeitDto;
}

export interface AdminTournamentControllerGetTournamentRequest {
  id: number;
}

export interface AdminTournamentControllerScheduleTournamentMatchRequest {
  id: number;
  scheduleTournamentMatchDto: ScheduleTournamentMatchDto;
}

export interface AdminTournamentControllerSetWinnerRequest {
  id: number;
  setWinnerDto: SetWinnerDto;
}

export interface AdminTournamentControllerStartTournamentRequest {
  startTournamentDto: StartTournamentDto;
}

export interface AdminTournamentControllerTournamentMatchRequest {
  id: number;
}

/**
 *
 */
export class AdminTournamentApi extends runtime.BaseAPI {
  /**
   */
  private async adminTournamentControllerCancelTournamentRaw(
    requestParameters: AdminTournamentControllerCancelTournamentRequest
  ): Promise<runtime.ApiResponse<void>> {
    this.adminTournamentControllerCancelTournamentValidation(requestParameters);
    const context = this.adminTournamentControllerCancelTournamentContext(requestParameters);
    const response = await this.request(context);

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  private adminTournamentControllerCancelTournamentValidation(
    requestParameters: AdminTournamentControllerCancelTournamentRequest
  ) {
    if (requestParameters.startTournamentDto === null || requestParameters.startTournamentDto === undefined) {
      throw new runtime.RequiredError(
        "startTournamentDto",
        "Required parameter requestParameters.startTournamentDto was null or undefined when calling adminTournamentControllerCancelTournament."
      );
    }
  }

  /**
   */
  adminTournamentControllerCancelTournamentContext(
    requestParameters: AdminTournamentControllerCancelTournamentRequest
  ): runtime.RequestOpts {
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
      path: `/v1/admin/tournament/cancel_tournament`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: StartTournamentDtoToJSON(requestParameters.startTournamentDto)
    };
  }

  /**
   */
  adminTournamentControllerCancelTournament = async (startTournamentDto: StartTournamentDto): Promise<void> => {
    await this.adminTournamentControllerCancelTournamentRaw({ startTournamentDto: startTournamentDto });
  };

  /**
   */
  private async adminTournamentControllerCreateTournamentRaw(
    requestParameters: AdminTournamentControllerCreateTournamentRequest
  ): Promise<runtime.ApiResponse<TournamentDto>> {
    this.adminTournamentControllerCreateTournamentValidation(requestParameters);
    const context = this.adminTournamentControllerCreateTournamentContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => TournamentDtoFromJSON(jsonValue));
  }

  /**
   */
  private adminTournamentControllerCreateTournamentValidation(
    requestParameters: AdminTournamentControllerCreateTournamentRequest
  ) {
    if (requestParameters.createTournamentDto === null || requestParameters.createTournamentDto === undefined) {
      throw new runtime.RequiredError(
        "createTournamentDto",
        "Required parameter requestParameters.createTournamentDto was null or undefined when calling adminTournamentControllerCreateTournament."
      );
    }
  }

  /**
   */
  adminTournamentControllerCreateTournamentContext(
    requestParameters: AdminTournamentControllerCreateTournamentRequest
  ): runtime.RequestOpts {
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
      path: `/v1/admin/tournament/create_tournament`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: CreateTournamentDtoToJSON(requestParameters.createTournamentDto)
    };
  }

  /**
   */
  adminTournamentControllerCreateTournament = async (
    createTournamentDto: CreateTournamentDto
  ): Promise<TournamentDto> => {
    const response = await this.adminTournamentControllerCreateTournamentRaw({
      createTournamentDto: createTournamentDto
    });
    return await response.value();
  };

  /**
   */
  private async adminTournamentControllerForfeitRaw(
    requestParameters: AdminTournamentControllerForfeitRequest
  ): Promise<runtime.ApiResponse<TournamentBracketMatchDto>> {
    this.adminTournamentControllerForfeitValidation(requestParameters);
    const context = this.adminTournamentControllerForfeitContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => TournamentBracketMatchDtoFromJSON(jsonValue));
  }

  /**
   */
  private adminTournamentControllerForfeitValidation(requestParameters: AdminTournamentControllerForfeitRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminTournamentControllerForfeit."
      );
    }
    if (requestParameters.forfeitDto === null || requestParameters.forfeitDto === undefined) {
      throw new runtime.RequiredError(
        "forfeitDto",
        "Required parameter requestParameters.forfeitDto was null or undefined when calling adminTournamentControllerForfeit."
      );
    }
  }

  /**
   */
  adminTournamentControllerForfeitContext(
    requestParameters: AdminTournamentControllerForfeitRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    return {
      path: `/v1/admin/tournament/tournament_match/{id}/forfeit`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: ForfeitDtoToJSON(requestParameters.forfeitDto)
    };
  }

  /**
   */
  adminTournamentControllerForfeit = async (id: number, forfeitDto: ForfeitDto): Promise<TournamentBracketMatchDto> => {
    const response = await this.adminTournamentControllerForfeitRaw({ id: id, forfeitDto: forfeitDto });
    return await response.value();
  };

  /**
   */
  private async adminTournamentControllerGetTournamentRaw(
    requestParameters: AdminTournamentControllerGetTournamentRequest
  ): Promise<runtime.ApiResponse<TournamentDto>> {
    this.adminTournamentControllerGetTournamentValidation(requestParameters);
    const context = this.adminTournamentControllerGetTournamentContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => TournamentDtoFromJSON(jsonValue));
  }

  /**
   */
  private adminTournamentControllerGetTournamentValidation(
    requestParameters: AdminTournamentControllerGetTournamentRequest
  ) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminTournamentControllerGetTournament."
      );
    }
  }

  /**
   */
  adminTournamentControllerGetTournamentContext(
    requestParameters: AdminTournamentControllerGetTournamentRequest
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
      path: `/v1/admin/tournament/get/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  adminTournamentControllerGetTournament = async (id: number): Promise<TournamentDto> => {
    const response = await this.adminTournamentControllerGetTournamentRaw({ id: id });
    return await response.value();
  };

  useAdminTournamentControllerGetTournament(id: number, config?: ConfigInterface<TournamentDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.adminTournamentControllerGetTournamentContext({ id: id! });
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.adminTournamentControllerGetTournament(id!) : undefined,
      config
    );
  }

  /**
   */
  private async adminTournamentControllerListTournamentsRaw(): Promise<runtime.ApiResponse<Array<TournamentDto>>> {
    this.adminTournamentControllerListTournamentsValidation();
    const context = this.adminTournamentControllerListTournamentsContext();
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => jsonValue.map(TournamentDtoFromJSON));
  }

  /**
   */
  private adminTournamentControllerListTournamentsValidation() {}

  /**
   */
  adminTournamentControllerListTournamentsContext(): runtime.RequestOpts {
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
      path: `/v1/admin/tournament/list`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  adminTournamentControllerListTournaments = async (): Promise<Array<TournamentDto>> => {
    const response = await this.adminTournamentControllerListTournamentsRaw();
    return await response.value();
  };

  useAdminTournamentControllerListTournaments(config?: ConfigInterface<Array<TournamentDto>, Error>) {
    let valid = true;

    const context = this.adminTournamentControllerListTournamentsContext();
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.adminTournamentControllerListTournaments() : undefined,
      config
    );
  }

  /**
   */
  private async adminTournamentControllerScheduleTournamentMatchRaw(
    requestParameters: AdminTournamentControllerScheduleTournamentMatchRequest
  ): Promise<runtime.ApiResponse<TournamentBracketMatchDto>> {
    this.adminTournamentControllerScheduleTournamentMatchValidation(requestParameters);
    const context = this.adminTournamentControllerScheduleTournamentMatchContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => TournamentBracketMatchDtoFromJSON(jsonValue));
  }

  /**
   */
  private adminTournamentControllerScheduleTournamentMatchValidation(
    requestParameters: AdminTournamentControllerScheduleTournamentMatchRequest
  ) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminTournamentControllerScheduleTournamentMatch."
      );
    }
    if (
      requestParameters.scheduleTournamentMatchDto === null ||
      requestParameters.scheduleTournamentMatchDto === undefined
    ) {
      throw new runtime.RequiredError(
        "scheduleTournamentMatchDto",
        "Required parameter requestParameters.scheduleTournamentMatchDto was null or undefined when calling adminTournamentControllerScheduleTournamentMatch."
      );
    }
  }

  /**
   */
  adminTournamentControllerScheduleTournamentMatchContext(
    requestParameters: AdminTournamentControllerScheduleTournamentMatchRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    return {
      path: `/v1/admin/tournament/tournament_match/{id}/schedule`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: ScheduleTournamentMatchDtoToJSON(requestParameters.scheduleTournamentMatchDto)
    };
  }

  /**
   */
  adminTournamentControllerScheduleTournamentMatch = async (
    id: number,
    scheduleTournamentMatchDto: ScheduleTournamentMatchDto
  ): Promise<TournamentBracketMatchDto> => {
    const response = await this.adminTournamentControllerScheduleTournamentMatchRaw({
      id: id,
      scheduleTournamentMatchDto: scheduleTournamentMatchDto
    });
    return await response.value();
  };

  /**
   */
  private async adminTournamentControllerSetWinnerRaw(
    requestParameters: AdminTournamentControllerSetWinnerRequest
  ): Promise<runtime.ApiResponse<TournamentBracketMatchDto>> {
    this.adminTournamentControllerSetWinnerValidation(requestParameters);
    const context = this.adminTournamentControllerSetWinnerContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => TournamentBracketMatchDtoFromJSON(jsonValue));
  }

  /**
   */
  private adminTournamentControllerSetWinnerValidation(requestParameters: AdminTournamentControllerSetWinnerRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminTournamentControllerSetWinner."
      );
    }
    if (requestParameters.setWinnerDto === null || requestParameters.setWinnerDto === undefined) {
      throw new runtime.RequiredError(
        "setWinnerDto",
        "Required parameter requestParameters.setWinnerDto was null or undefined when calling adminTournamentControllerSetWinner."
      );
    }
  }

  /**
   */
  adminTournamentControllerSetWinnerContext(
    requestParameters: AdminTournamentControllerSetWinnerRequest
  ): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    return {
      path: `/v1/admin/tournament/tournament_match/{id}/set_winner`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: SetWinnerDtoToJSON(requestParameters.setWinnerDto)
    };
  }

  /**
   */
  adminTournamentControllerSetWinner = async (
    id: number,
    setWinnerDto: SetWinnerDto
  ): Promise<TournamentBracketMatchDto> => {
    const response = await this.adminTournamentControllerSetWinnerRaw({ id: id, setWinnerDto: setWinnerDto });
    return await response.value();
  };

  /**
   */
  private async adminTournamentControllerStartTournamentRaw(
    requestParameters: AdminTournamentControllerStartTournamentRequest
  ): Promise<runtime.ApiResponse<void>> {
    this.adminTournamentControllerStartTournamentValidation(requestParameters);
    const context = this.adminTournamentControllerStartTournamentContext(requestParameters);
    const response = await this.request(context);

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  private adminTournamentControllerStartTournamentValidation(
    requestParameters: AdminTournamentControllerStartTournamentRequest
  ) {
    if (requestParameters.startTournamentDto === null || requestParameters.startTournamentDto === undefined) {
      throw new runtime.RequiredError(
        "startTournamentDto",
        "Required parameter requestParameters.startTournamentDto was null or undefined when calling adminTournamentControllerStartTournament."
      );
    }
  }

  /**
   */
  adminTournamentControllerStartTournamentContext(
    requestParameters: AdminTournamentControllerStartTournamentRequest
  ): runtime.RequestOpts {
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
      path: `/v1/admin/tournament/start_tournament`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: StartTournamentDtoToJSON(requestParameters.startTournamentDto)
    };
  }

  /**
   */
  adminTournamentControllerStartTournament = async (startTournamentDto: StartTournamentDto): Promise<void> => {
    await this.adminTournamentControllerStartTournamentRaw({ startTournamentDto: startTournamentDto });
  };

  /**
   */
  private async adminTournamentControllerTournamentMatchRaw(
    requestParameters: AdminTournamentControllerTournamentMatchRequest
  ): Promise<runtime.ApiResponse<TournamentBracketMatchDto>> {
    this.adminTournamentControllerTournamentMatchValidation(requestParameters);
    const context = this.adminTournamentControllerTournamentMatchContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => TournamentBracketMatchDtoFromJSON(jsonValue));
  }

  /**
   */
  private adminTournamentControllerTournamentMatchValidation(
    requestParameters: AdminTournamentControllerTournamentMatchRequest
  ) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling adminTournamentControllerTournamentMatch."
      );
    }
  }

  /**
   */
  adminTournamentControllerTournamentMatchContext(
    requestParameters: AdminTournamentControllerTournamentMatchRequest
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
      path: `/v1/admin/tournament/tournament_match/{id}`.replace(
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
  adminTournamentControllerTournamentMatch = async (id: number): Promise<TournamentBracketMatchDto> => {
    const response = await this.adminTournamentControllerTournamentMatchRaw({ id: id });
    return await response.value();
  };

  useAdminTournamentControllerTournamentMatch(id: number, config?: ConfigInterface<TournamentBracketMatchDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.adminTournamentControllerTournamentMatchContext({ id: id! });
    return useSWR(
      JSON.stringify(context),
      valid ? () => this.adminTournamentControllerTournamentMatch(id!) : undefined,
      config
    );
  }
}
