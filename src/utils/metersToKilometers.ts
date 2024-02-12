export function metersToKilometers(visibilityInMeters : number) : string {
    const visibilityInKilometers = visibilityInMeters / 1000;
    return `${visibilityInKilometers.toFixed(0)}km` // Round to int (0 decimal) and add 'km' unit
}