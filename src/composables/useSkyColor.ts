import { useWeatherStore } from "@/stores/WeatherStore";
import { computed } from "vue";

type DayTimeName = "day" | "night" | "golden-hour";

export function useSkyColor() {
  const weatherStore = useWeatherStore();

  function calculateDateTimeName(
    timestampInS: number,
    sunriseTimestamp: number | null = null,
    sunsetTimestamp: number | null = null,
  ): DayTimeName {
    if (sunsetTimestamp === null || sunriseTimestamp === null) {
      const hours = new Date(timestampInS * 1000).getHours();
      if (hours > 21 || hours < 6) return "night";
      return "day";
    }

    const halfAnHourInSec = 30 * 60;
    if (
      Math.abs(sunriseTimestamp - timestampInS) <= halfAnHourInSec ||
      Math.abs(sunsetTimestamp - timestampInS) <= halfAnHourInSec
    ) {
      return "golden-hour";
    }

    if (timestampInS > sunriseTimestamp && timestampInS < sunsetTimestamp) {
      return "day";
    }

    return "night";
  }

  const skyColorName = computed(() => {
    const currentTimestampInMs = new Date().getTime();
    const currentTimestamp = currentTimestampInMs / 1000;

    return calculateDateTimeName(
      currentTimestamp,
      weatherStore.currentWeather?.sys?.sunrise || null,
      weatherStore.currentWeather?.sys?.sunset || null,
    );
  });

  return { skyColorName };
}
