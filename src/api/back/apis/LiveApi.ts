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
  LiveMatchDto,
  LiveMatchDtoFromJSON,
  LiveMatchDtoToJSON,
  LiveMatchSseDto,
  LiveMatchSseDtoFromJSON,
  LiveMatchSseDtoToJSON
} from "../models";

export interface LiveMatchControllerLiveMatchRequest {
  id: number;
}

/**
 *
 */
export class LiveApi extends runtime.BaseAPI {
  /**
   */
  private async liveMatchControllerListMatchesRaw(): Promise<runtime.ApiResponse<Array<LiveMatchDto>>> {
    this.liveMatchControllerListMatchesValidation();
    const context = this.liveMatchControllerListMatchesContext();
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => jsonValue.map(LiveMatchDtoFromJSON));
  }

  /**
   */
  private liveMatchControllerListMatchesValidation() {}

  /**
   */
  liveMatchControllerListMatchesContext(): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/live/list`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  liveMatchControllerListMatches = async (): Promise<Array<LiveMatchDto>> => {
    const response = await this.liveMatchControllerListMatchesRaw();
    return await response.value();
  };

  useLiveMatchControllerListMatches(config?: ConfigInterface<Array<LiveMatchDto>, Error>) {
    let valid = true;

    const context = this.liveMatchControllerListMatchesContext();
    return useSWR(JSON.stringify(context), valid ? () => this.liveMatchControllerListMatches() : undefined, config);
  }

  /**
   */
  private async liveMatchControllerLiveMatchRaw(
    requestParameters: LiveMatchControllerLiveMatchRequest
  ): Promise<runtime.ApiResponse<LiveMatchSseDto>> {
    this.liveMatchControllerLiveMatchValidation(requestParameters);
    const context = this.liveMatchControllerLiveMatchContext(requestParameters);
    const response = await this.request(context);

    return new runtime.JSONApiResponse(response, jsonValue => LiveMatchSseDtoFromJSON(jsonValue));
  }

  /**
   */
  private liveMatchControllerLiveMatchValidation(requestParameters: LiveMatchControllerLiveMatchRequest) {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling liveMatchControllerLiveMatch."
      );
    }
  }

  /**
   */
  liveMatchControllerLiveMatchContext(requestParameters: LiveMatchControllerLiveMatchRequest): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/live/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  liveMatchControllerLiveMatch = async (id: number): Promise<LiveMatchSseDto> => {
    const response = await this.liveMatchControllerLiveMatchRaw({ id: id });
    return await response.value();
  };

  useLiveMatchControllerLiveMatch(id: number, config?: ConfigInterface<LiveMatchSseDto, Error>) {
    let valid = true;

    if (id === null || id === undefined || Number.isNaN(id)) {
      valid = false;
    }

    const context = this.liveMatchControllerLiveMatchContext({ id: id! });
    return useSWR(JSON.stringify(context), valid ? () => this.liveMatchControllerLiveMatch(id!) : undefined, config);
  }
}
