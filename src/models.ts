export interface Sys {
    country: string;
}

export interface Wind {
    speed: number;
}

export interface Main {
    temp: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
}

export interface Weather {
    main: string;
    description: string;
    icon: string;
}

export interface City {
    id: string;
    name: string;
    sys: Sys;
    weather: Weather;
    main: Main;
    wind: Wind;
    visibility: number;
}

export interface Geolocation {
    latitude: number,
    longitude: number;
}

export interface Reference {
    city: string;
    country: string;
}

export interface Config {
    refs: Reference[]
}