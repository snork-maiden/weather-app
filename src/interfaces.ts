import type { WeatherTypes } from "./enums";

export interface CityName {
  country: string;
  state: string;
  name: string;
  lat: number;
  lon: number;
  id: number;
}

export interface Weather {
  clouds: { all: number };
  id: number;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    [propName: string]: any;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<WeatherItem>;

  wind?: { speed: number; [propName: string]: any };
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
}

interface WeatherItem {
  description: keyof typeof WeatherTypes;
  icon: string;
  id: number;
  main: string;
}

export interface Forecast {
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  list: Array<WeatherForecastItem>;
  [propName: string]: any;
}

export interface WeatherForecastItem extends Weather {
  dt: number;
  dt_txt: string;
  pop: number;
  [propName: string]: any;
}

export interface WeatherCardData {
  main: string;
  temp: number;
  dt: number;
  description: keyof typeof WeatherTypes;
  type: "hours" | "days";
}
