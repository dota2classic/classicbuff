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
 * @interface ForfeitDto
 */
export interface ForfeitDto {
  /**
   *
   * @type {string}
   * @memberof ForfeitDto
   */
  forfeitId: string;
}

export function ForfeitDtoFromJSON(json: any): ForfeitDto {
  return ForfeitDtoFromJSONTyped(json, false);
}

export function ForfeitDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ForfeitDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    forfeitId: json["forfeitId"]
  };
}

export function ForfeitDtoToJSON(value?: ForfeitDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    forfeitId: value.forfeitId
  };
}