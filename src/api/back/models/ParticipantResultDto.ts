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
  TournamentBracketParticipantDto,
  TournamentBracketParticipantDtoFromJSON,
  TournamentBracketParticipantDtoFromJSONTyped,
  TournamentBracketParticipantDtoToJSON
} from "./";

/**
 *
 * @export
 * @interface ParticipantResultDto
 */
export interface ParticipantResultDto {
  /**
   *
   * @type {number}
   * @memberof ParticipantResultDto
   */
  id: number | null;
  /**
   *
   * @type {number}
   * @memberof ParticipantResultDto
   */
  position?: number;
  /**
   *
   * @type {boolean}
   * @memberof ParticipantResultDto
   */
  forfeit?: boolean;
  /**
   *
   * @type {number}
   * @memberof ParticipantResultDto
   */
  score?: number;
  /**
   *
   * @type {string}
   * @memberof ParticipantResultDto
   */
  result?: string;
  /**
   *
   * @type {TournamentBracketParticipantDto}
   * @memberof ParticipantResultDto
   */
  participant?: TournamentBracketParticipantDto;
}

export function ParticipantResultDtoFromJSON(json: any): ParticipantResultDto {
  return ParticipantResultDtoFromJSONTyped(json, false);
}

export function ParticipantResultDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ParticipantResultDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    position: !exists(json, "position") ? undefined : json["position"],
    forfeit: !exists(json, "forfeit") ? undefined : json["forfeit"],
    score: !exists(json, "score") ? undefined : json["score"],
    result: !exists(json, "result") ? undefined : json["result"],
    participant: !exists(json, "participant") ? undefined : TournamentBracketParticipantDtoFromJSON(json["participant"])
  };
}

export function ParticipantResultDtoToJSON(value?: ParticipantResultDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    position: value.position,
    forfeit: value.forfeit,
    score: value.score,
    result: value.result,
    participant: TournamentBracketParticipantDtoToJSON(value.participant)
  };
}
