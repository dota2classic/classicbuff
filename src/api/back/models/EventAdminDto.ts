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
 * @interface EventAdminDto
 */
export interface EventAdminDto {
    /**
     *
     * @type {string}
     * @memberof EventAdminDto
     */
    name: string;
    /**
     *
     * @type {object}
     * @memberof EventAdminDto
     */
    body: object;
}

export function EventAdminDtoFromJSON(json: any): EventAdminDto {
    return EventAdminDtoFromJSONTyped(json, false);
}

export function EventAdminDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventAdminDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'name': json['name'],
        'body': json['body'],
    };
}

export function EventAdminDtoToJSON(value?: EventAdminDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'name': value.name,
        'body': value.body,
    };
}


