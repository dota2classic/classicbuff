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

/**
 *
 * @export
 * @interface PlayerInPartyDto
 */
export interface PlayerInPartyDto {
    /**
     *
     * @type {string}
     * @memberof PlayerInPartyDto
     */
    steamId: string;
    /**
     *
     * @type {string}
     * @memberof PlayerInPartyDto
     */
    avatar: string;
    /**
     *
     * @type {string}
     * @memberof PlayerInPartyDto
     */
    name: string;
}

export function PlayerInPartyDtoFromJSON(json: any): PlayerInPartyDto {
    return PlayerInPartyDtoFromJSONTyped(json, false);
}

export function PlayerInPartyDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerInPartyDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'steamId': json['steam_id'],
        'avatar': json['avatar'],
        'name': json['name'],
    };
}

export function PlayerInPartyDtoToJSON(value?: PlayerInPartyDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'steam_id': value.steamId,
        'avatar': value.avatar,
        'name': value.name,
    };
}


