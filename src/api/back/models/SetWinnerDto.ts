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
 * @interface SetWinnerDto
 */
export interface SetWinnerDto {
  /**
   *
   * @type {string}
   * @memberof SetWinnerDto
   */
  winnerId: string;
}

export function SetWinnerDtoFromJSON(json: any): SetWinnerDto {
  return SetWinnerDtoFromJSONTyped(json, false);
}

export function SetWinnerDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SetWinnerDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    winnerId: json["winnerId"]
  };
}

export function SetWinnerDtoToJSON(value?: SetWinnerDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    winnerId: value.winnerId
  };
}