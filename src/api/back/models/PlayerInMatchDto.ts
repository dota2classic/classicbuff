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
 * @interface PlayerInMatchDto
 */
export interface PlayerInMatchDto {
    /**
     *
     * @type {string}
     * @memberof PlayerInMatchDto
     */
    steamId: string;
    /**
     *
     * @type {string}
     * @memberof PlayerInMatchDto
     */
    name: string;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    team: number;
    /**
     *
     * @type {string}
     * @memberof PlayerInMatchDto
     */
    hero: string;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    level: number;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    kills: number;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    deaths: number;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    assists: number;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    gpm: number;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    xpm: number;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    lastHits: number;
    /**
     *
     * @type {number}
     * @memberof PlayerInMatchDto
     */
    denies: number;
    /**
     *
     * @type {Array<string>}
     * @memberof PlayerInMatchDto
     */
    items: Array<string>;
    /**
     *
     * @type {boolean}
     * @memberof PlayerInMatchDto
     */
    abandoned: boolean;
}

export function PlayerInMatchDtoFromJSON(json: any): PlayerInMatchDto {
    return PlayerInMatchDtoFromJSONTyped(json, false);
}

export function PlayerInMatchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerInMatchDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'steamId': json['steam_id'],
        'name': json['name'],
        'team': json['team'],
        'hero': json['hero'],
        'level': json['level'],
        'kills': json['kills'],
        'deaths': json['deaths'],
        'assists': json['assists'],
        'gpm': json['gpm'],
        'xpm': json['xpm'],
        'lastHits': json['last_hits'],
        'denies': json['denies'],
        'items': json['items'],
        'abandoned': json['abandoned'],
    };
}

export function PlayerInMatchDtoToJSON(value?: PlayerInMatchDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'steam_id': value.steamId,
        'name': value.name,
        'team': value.team,
        'hero': value.hero,
        'level': value.level,
        'kills': value.kills,
        'deaths': value.deaths,
        'assists': value.assists,
        'gpm': value.gpm,
        'xpm': value.xpm,
        'last_hits': value.lastHits,
        'denies': value.denies,
        'items': value.items,
        'abandoned': value.abandoned,
    };
}


