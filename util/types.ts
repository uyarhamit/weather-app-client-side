export type cityType = {
    id: Number;
    name: String;
    country: String;
}

export type citiesResponseTypes = {
    data: cityType[];
    limit: Number;
    offset: Number;
    count: Number;
    error?: String;
}

export type weatherType = {
    date: String;
    min: Number;
    max: Number;
    condition: String;
}

export type weathersResponseTypes = {
    data: weatherType;
    days: Number;
    error?: String;
}