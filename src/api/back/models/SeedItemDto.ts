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

import { exists, mapValues } from "../runtime";
import { TeamDto, TeamDtoFromJSON, TeamDtoFromJSONTyped, TeamDtoToJSON } from "./";

/**
 *
 * @export
 * @interface SeedItemDto
 */
export interface SeedItemDto {
  /**
   *
   * @type {string}
   * @memberof SeedItemDto
   */
  steamId?: string;
  /**
   *
   * @type {string}
   * @memberof SeedItemDto
   */
  playerName?: string;
  /**
   *
   * @type {TeamDto}
   * @memberof SeedItemDto
   */
  team?: TeamDto;
  /**
   *
   * @type {string}
   * @memberof SeedItemDto
   */
  result?: string;
  /**
   *
   * @type {boolean}
   * @memberof SeedItemDto
   */
  tbd?: boolean;
}

export function SeedItemDtoFromJSON(json: any): SeedItemDto {
  return SeedItemDtoFromJSONTyped(json, false);
}

export function SeedItemDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SeedItemDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    steamId: !exists(json, "steam_id") ? undefined : json["steam_id"],
    playerName: !exists(json, "playerName") ? undefined : json["playerName"],
    team: !exists(json, "team") ? undefined : TeamDtoFromJSON(json["team"]),
    result: !exists(json, "result") ? undefined : json["result"],
    tbd: !exists(json, "tbd") ? undefined : json["tbd"]
  };
}

export function SeedItemDtoToJSON(value?: SeedItemDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    steam_id: value.steamId,
    playerName: value.playerName,
    team: TeamDtoToJSON(value.team),
    result: value.result,
    tbd: value.tbd
  };
}
