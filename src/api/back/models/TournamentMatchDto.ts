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
import { SeedItemDto, SeedItemDtoFromJSON, SeedItemDtoFromJSONTyped, SeedItemDtoToJSON } from "./";

/**
 *
 * @export
 * @interface TournamentMatchDto
 */
export interface TournamentMatchDto {
  /**
   *
   * @type {number}
   * @memberof TournamentMatchDto
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof TournamentMatchDto
   */
  status: TournamentMatchDtoStatusEnum;
  /**
   *
   * @type {number}
   * @memberof TournamentMatchDto
   */
  scheduledDate: number;
  /**
   *
   * @type {number}
   * @memberof TournamentMatchDto
   */
  externalMatchId: number;
  /**
   *
   * @type {number}
   * @memberof TournamentMatchDto
   */
  teamOffset: number;
  /**
   *
   * @type {SeedItemDto}
   * @memberof TournamentMatchDto
   */
  opponent1?: SeedItemDto;
  /**
   *
   * @type {SeedItemDto}
   * @memberof TournamentMatchDto
   */
  opponent2?: SeedItemDto;
}

export function TournamentMatchDtoFromJSON(json: any): TournamentMatchDto {
  return TournamentMatchDtoFromJSONTyped(json, false);
}

export function TournamentMatchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TournamentMatchDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    status: json["status"],
    scheduledDate: json["scheduledDate"],
    externalMatchId: json["externalMatchId"],
    teamOffset: json["teamOffset"],
    opponent1: !exists(json, "opponent1") ? undefined : SeedItemDtoFromJSON(json["opponent1"]),
    opponent2: !exists(json, "opponent2") ? undefined : SeedItemDtoFromJSON(json["opponent2"])
  };
}

export function TournamentMatchDtoToJSON(value?: TournamentMatchDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    status: value.status,
    scheduledDate: value.scheduledDate,
    externalMatchId: value.externalMatchId,
    teamOffset: value.teamOffset,
    opponent1: SeedItemDtoToJSON(value.opponent1),
    opponent2: SeedItemDtoToJSON(value.opponent2)
  };
}

/**
 * @export
 * @enum {string}
 */
export enum TournamentMatchDtoStatusEnum {
  Locked = "Locked",
  Waiting = "Waiting",
  Ready = "Ready",
  Running = "Running",
  Completed = "Completed",
  Archived = "Archived"
}