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

import { PlayerInPartyDto, PlayerInPartyDtoFromJSON, PlayerInPartyDtoToJSON } from "./";

/**
 *
 * @export
 * @interface PartyDto
 */
export interface PartyDto {
    /**
     *
     * @type {string}
     * @memberof PartyDto
     */
    id: string;
    /**
     *
     * @type {PlayerInPartyDto}
     * @memberof PartyDto
     */
    leader: PlayerInPartyDto;
    /**
     *
     * @type {Array<PlayerInPartyDto>}
     * @memberof PartyDto
     */
    players: Array<PlayerInPartyDto>;
}

export function PartyDtoFromJSON(json: any): PartyDto {
    return PartyDtoFromJSONTyped(json, false);
}

export function PartyDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartyDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': json['id'],
        'leader': PlayerInPartyDtoFromJSON(json['leader']),
        'players': ((json['players'] as Array<any>).map(PlayerInPartyDtoFromJSON)),
    };
}

export function PartyDtoToJSON(value?: PartyDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'leader': PlayerInPartyDtoToJSON(value.leader),
        'players': ((value.players as Array<any>).map(PlayerInPartyDtoToJSON)),
    };
}


