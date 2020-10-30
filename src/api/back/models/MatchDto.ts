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
import { PlayerInMatchDto, PlayerInMatchDtoFromJSON, PlayerInMatchDtoFromJSONTyped, PlayerInMatchDtoToJSON } from "./";

/**
 *
 * @export
 * @interface MatchDto
 */
export interface MatchDto {
  /**
   *
   * @type {number}
   * @memberof MatchDto
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof MatchDto
   */
  mode: MatchDtoModeEnum;
  /**
   *
   * @type {Array<PlayerInMatchDto>}
   * @memberof MatchDto
   */
  radiant: Array<PlayerInMatchDto>;
  /**
   *
   * @type {Array<PlayerInMatchDto>}
   * @memberof MatchDto
   */
  dire: Array<PlayerInMatchDto>;
  /**
   *
   * @type {number}
   * @memberof MatchDto
   */
  winner: number;
  /**
   *
   * @type {number}
   * @memberof MatchDto
   */
  duration: number;
  /**
   *
   * @type {string}
   * @memberof MatchDto
   */
  timestamp: string;
}

export function MatchDtoFromJSON(json: any): MatchDto {
  return MatchDtoFromJSONTyped(json, false);
}

export function MatchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MatchDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    mode: json["mode"],
    radiant: (json["radiant"] as Array<any>).map(PlayerInMatchDtoFromJSON),
    dire: (json["dire"] as Array<any>).map(PlayerInMatchDtoFromJSON),
    winner: json["winner"],
    duration: json["duration"],
    timestamp: json["timestamp"]
  };
}

export function MatchDtoToJSON(value?: MatchDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    mode: value.mode,
    radiant: (value.radiant as Array<any>).map(PlayerInMatchDtoToJSON),
    dire: (value.dire as Array<any>).map(PlayerInMatchDtoToJSON),
    winner: value.winner,
    duration: value.duration,
    timestamp: value.timestamp
  };
}

/**
 * @export
 * @enum {string}
 */
export enum MatchDtoModeEnum {
  RANKED = "RANKED",
  UNRANKED = "UNRANKED",
  SOLOMID = "SOLOMID",
  DIRETIDE = "DIRETIDE",
  GREEVILING = "GREEVILING",
  ABILITYDRAFT = "ABILITY_DRAFT",
  TOURNAMENT = "TOURNAMENT"
}