export type requestCitiesType = {
    limit: Number;
    offset?: number;
    name?: String;
    country?: String;
}

export type requestWeatherType = {
    id: Number;
}

export type responseWeatherType = {
    data: [],
    days: Number,
    error: null
}