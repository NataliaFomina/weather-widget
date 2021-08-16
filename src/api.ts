import axios from "axios";
import {City, Geolocation} from "./models";

const APP_ID = "3646f73955ee9984114ec7e7b41ad3fb";
const BASE_API_URL = "https://api.openweathermap.org";
const BASE_URL = "http://openweathermap.org";

function fetchCityByName(name: string): Promise<City> {
    return new Promise<City>((resolve, reject) => {
        axios
            .get(`${BASE_API_URL}/data/2.5/weather`, {
                params: {
                    q: name,
                    appId: APP_ID,
                    units: "metric"
                }
            })
            .then((response: any) => {
                resolve(responseDataToCity(response.data))
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

function fetchCityByGeolocation(geolocation: Geolocation) {
    return new Promise<City>((resolve, reject) => {
        axios
            .get(`${BASE_API_URL}/data/2.5/weather`, {
                params: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    appId: APP_ID,
                    units: "metric"
                },
            })
            .then((response: any) => {
                resolve(responseDataToCity(response.data))
            })
            .catch((error: any) => {
                reject(error);
            });
    })
}

function getIcon(city: City): string {
    return `${BASE_URL}/img/w/${city.weather.icon}.png`
}

function responseDataToCity(data: any): City {
    const toUpper = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    };
    return {
        id: data["id"],
        name: data["name"],
        sys: {
            country: data["sys"]["country"],
        },
        weather: {
            main: data["weather"][0]["main"],
            description: toUpper(data["weather"][0]["description"]),
            icon: data["weather"][0]["icon"],
        },
        main: {
            temp: Math.round(data["main"]["temp"]),
            feelsLike: Math.round(data["main"]["feels_like"]),
            pressure: data["main"]["pressure"],
            humidity: data["main"]["humidity"],
        },
        wind: {
            speed: data["wind"]["speed"],
        },
        visibility: data["visibility"] / 1000,
    }
}