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
/**
 *
 * @export
 * @interface PlayerGeneralStatsDto
 */
export interface PlayerGeneralStatsDto {
  /**
   *
   * @type {string}
   * @memberof PlayerGeneralStatsDto
   */
  steamId: string;
  /**
   *
   * @type {number}
   * @memberof PlayerGeneralStatsDto
   */
  gamesPlayed: number;
  /**
   *
   * @type {number}
   * @memberof PlayerGeneralStatsDto
   */
  gamesPlayedAll: number;
  /**
   *
   * @type {number}
   * @memberof PlayerGeneralStatsDto
   */
  wins: number;
  /**
   *
   * @type {number}
   * @memberof PlayerGeneralStatsDto
   */
  loss: number;
}

export function PlayerGeneralStatsDtoFromJSON(json: any): PlayerGeneralStatsDto {
  return PlayerGeneralStatsDtoFromJSONTyped(json, false);
}

export function PlayerGeneralStatsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerGeneralStatsDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    steamId: json["steam_id"],
    gamesPlayed: json["games_played"],
    gamesPlayedAll: json["games_played_all"],
    wins: json["wins"],
    loss: json["loss"]
  };
}

export function PlayerGeneralStatsDtoToJSON(value?: PlayerGeneralStatsDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    steam_id: value.steamId,
    games_played: value.gamesPlayed,
    games_played_all: value.gamesPlayedAll,
    wins: value.wins,
    loss: value.loss
  };
}
