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
  };
  name: "Yerevan";
  sys: {
    type: 1;
    id: 8851;
    country: "AM";
    sunrise: 1674533870;
    sunset: 1674569387;
  };
  timezone: 14400;
  visibility: 10000;
  weather: Array<WeatherItem>;

  wind: { speed: number };
}

interface WeatherItem {
  description: string;
  icon: string;
  id: number;
  main: string;
}
