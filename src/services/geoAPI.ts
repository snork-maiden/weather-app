import type { CityCoordinates } from "@/interfaces";

export async function getCurrentCityByGeolocation(): Promise<CityCoordinates> {
  const response = await fetch(
    `https://api.geoapify.com/v1/ipinfo?apiKey=${import.meta.env.VITE_GEOLOCATION_API_KEY}`,
    {
      method: "GET",
    },
  );

  if (response.ok) {
    const json = await response.json();
    return {
      latitude: json.location.latitude,
      longitude: json.location.longitude,
    };
  } else {
    const TokioCoordinates: CityCoordinates = {
      latitude: 35.652832,
      longitude: 139.839478,
    };
    return TokioCoordinates;
  }
}
