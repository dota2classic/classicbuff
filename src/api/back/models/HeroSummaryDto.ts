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
 * @interface HeroSummaryDto
 */
export interface HeroSummaryDto {
    /**
     *
     * @type {number}
     * @memberof HeroSummaryDto
     */
    games: number;
    /**
     *
     * @type {number}
     * @memberof HeroSummaryDto
     */
    wins: number;
    /**
     *
     * @type {number}
     * @memberof HeroSummaryDto
     */
    losses: number;
    /**
     *
     * @type {number}
     * @memberof HeroSummaryDto
     */
    kills: number;
    /**
     *
     * @type {number}
     * @memberof HeroSummaryDto
     */
    deaths: number;
    /**
     *
     * @type {number}
     * @memberof HeroSummaryDto
     */
    assists: number;
    /**
     *
     * @type {string}
     * @memberof HeroSummaryDto
     */
    hero: string;
}

export function HeroSummaryDtoFromJSON(json: any): HeroSummaryDto {
    return HeroSummaryDtoFromJSONTyped(json, false);
}

export function HeroSummaryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): HeroSummaryDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'games': json['games'],
        'wins': json['wins'],
        'losses': json['losses'],
        'kills': json['kills'],
        'deaths': json['deaths'],
        'assists': json['assists'],
        'hero': json['hero'],
    };
}

export function HeroSummaryDtoToJSON(value?: HeroSummaryDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'games': value.games,
        'wins': value.wins,
        'losses': value.losses,
        'kills': value.kills,
        'deaths': value.deaths,
        'assists': value.assists,
        'hero': value.hero,
    };
}


