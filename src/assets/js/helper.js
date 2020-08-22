/**
 * This method extracts payload's type property & returns separately
 * Intended use with Store
 * @param payload
 * @return {{data: *, type: *}}
 */
export const splitPayload = payload => {
    
    // get type
    const type = payload.type;
    
    // delete the type property
    delete payload.type;
    
    return {
        type,
        data: payload
    }
}

/**
 * Capitalizes 1st letter of given string
 * @param text
 * @return {*}
 */
export const capitalizeFirstChar = text => {
    const first = text[0];
    const capital = first.toUpperCase();

    return text.replace(first, capital);
}
