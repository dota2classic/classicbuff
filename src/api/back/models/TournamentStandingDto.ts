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
import {
  PlayerPreviewDto,
  PlayerPreviewDtoFromJSON,
  PlayerPreviewDtoFromJSONTyped,
  PlayerPreviewDtoToJSON,
  TeamDto,
  TeamDtoFromJSON,
  TeamDtoFromJSONTyped,
  TeamDtoToJSON
} from "./";

/**
 *
 * @export
 * @interface TournamentStandingDto
 */
export interface TournamentStandingDto {
  /**
   *
   * @type {PlayerPreviewDto}
   * @memberof TournamentStandingDto
   */
  profile?: PlayerPreviewDto;
  /**
   *
   * @type {TeamDto}
   * @memberof TournamentStandingDto
   */
  team?: TeamDto;
  /**
   *
   * @type {number}
   * @memberof TournamentStandingDto
   */
  position: number;
}

export function TournamentStandingDtoFromJSON(json: any): TournamentStandingDto {
  return TournamentStandingDtoFromJSONTyped(json, false);
}

export function TournamentStandingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TournamentStandingDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    profile: !exists(json, "profile") ? undefined : PlayerPreviewDtoFromJSON(json["profile"]),
    team: !exists(json, "team") ? undefined : TeamDtoFromJSON(json["team"]),
    position: json["position"]
  };
}

export function TournamentStandingDtoToJSON(value?: TournamentStandingDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    profile: PlayerPreviewDtoToJSON(value.profile),
    team: TeamDtoToJSON(value.team),
    position: value.position
  };
}
