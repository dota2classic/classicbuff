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

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI {
  /**
   */
  private async discordControllerDiscordAuthRaw(): Promise<runtime.ApiResponse<void>> {
    this.discordControllerDiscordAuthValidation();
    const context = this.discordControllerDiscordAuthContext();
    const response = await this.request(context);

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  private discordControllerDiscordAuthValidation() {}

  /**
   */
  discordControllerDiscordAuthContext(): runtime.RequestOpts {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    return {
      path: `/v1/auth/discord`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    };
  }

  /**
   */
  discordControllerDiscordAuth = async (): Promise<void> => {
    await this.discordControllerDiscordAuthRaw();
  };

  useDiscordControllerDiscordAuth(config?: ConfigInterface<void, Error>) {
    let valid = true;

    const context = this.discordControllerDiscordAuthContext();
    return useSWR(JSON.stringify(context), valid ? () => this.discordControllerDiscordAuth() : undefined, config);
  }
}
