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

import { BanStatusDto, BanStatusDtoFromJSON, BanStatusDtoToJSON } from "./";

/**
 *
 * @export
 * @interface MeDto
 */
export interface MeDto {
    /**
     *
     * @type {string}
     * @memberof MeDto
     */
    steamId: string;
    /**
     *
     * @type {string}
     * @memberof MeDto
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof MeDto
     */
    avatar: string;
    /**
     *
     * @type {string}
     * @memberof MeDto
     */
    id: string;
    /**
     *
     * @type {number}
     * @memberof MeDto
     */
    mmr: number;
    /**
     *
     * @type {Array<string>}
     * @memberof MeDto
     */
    roles: Array<MeDtoRolesEnum>;
    /**
     *
     * @type {number}
     * @memberof MeDto
     */
    rank: number;
    /**
     *
     * @type {number}
     * @memberof MeDto
     */
    unrankedGamesLeft: number;
    /**
     *
     * @type {BanStatusDto}
     * @memberof MeDto
     */
    banStatus: BanStatusDto;
    /**
     *
     * @type {number}
     * @memberof MeDto
     */
    reportsAvailable: number;
}

export function MeDtoFromJSON(json: any): MeDto {
    return MeDtoFromJSONTyped(json, false);
}

export function MeDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MeDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'steamId': json['steam_id'],
        'name': json['name'],
        'avatar': json['avatar'],
        'id': json['id'],
        'mmr': json['mmr'],
        'roles': json['roles'],
        'rank': json['rank'],
        'unrankedGamesLeft': json['unrankedGamesLeft'],
        'banStatus': BanStatusDtoFromJSON(json['banStatus']),
        'reportsAvailable': json['reportsAvailable'],
    };
}

export function MeDtoToJSON(value?: MeDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'steam_id': value.steamId,
        'name': value.name,
        'avatar': value.avatar,
        'id': value.id,
        'mmr': value.mmr,
        'roles': value.roles,
        'rank': value.rank,
        'unrankedGamesLeft': value.unrankedGamesLeft,
        'banStatus': BanStatusDtoToJSON(value.banStatus),
        'reportsAvailable': value.reportsAvailable,
    };
}

/**
* @export
* @enum {string}
*/
export enum MeDtoRolesEnum {
    PLAYER = 'PLAYER',
    OLD = 'OLD',
    HUMAN = 'HUMAN',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN'
}


