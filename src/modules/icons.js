import svg01d from "../assets/icons/01d.svg";
import svg01n from "../assets/icons/01n.svg";
import svg02d from "../assets/icons/02d.svg";
import svg02n from "../assets/icons/02n.svg";
import svg03d from "../assets/icons/03d.svg";
import svg03n from "../assets/icons/03n.svg";
import svg04d from "../assets/icons/04d.svg";
import svg04n from "../assets/icons/04n.svg";
import svg09d from "../assets/icons/09d.svg";
import svg09n from "../assets/icons/09n.svg";
import svg10d from "../assets/icons/10d.svg";
import svg10n from "../assets/icons/10n.svg";
import svg11d from "../assets/icons/11d.svg";
import svg11n from "../assets/icons/11n.svg";
import svg13d from "../assets/icons/13d.svg";
import svg13n from "../assets/icons/13n.svg";
import svg50d from "../assets/icons/50d.svg";
import svg50n from "../assets/icons/50n.svg";
const ICON_MAP = {
  0: { day: svg01d, night: svg01n }, // Clear sky
  1: { day: svg02d, night: svg02n }, // Mainly clear
  2: { day: svg03d, night: svg03n }, // Partly cloudy
  3: { day: svg04d, night: svg04n }, // Overcast

  45: { day: svg50d, night: svg50n }, // Fog
  48: { day: svg50d, night: svg50n }, // Depositing rime fog

  51: { day: svg10d, night: svg10n }, // Light drizzle
  53: { day: svg10d, night: svg10n }, // Moderate drizzle
  55: { day: svg10d, night: svg10n }, // Dense drizzle

  61: { day: svg09d, night: svg09n }, // Slight rain
  63: { day: svg09d, night: svg09n }, // Moderate rain
  65: { day: svg09d, night: svg09n }, // Heavy rain

  71: { day: svg13d, night: svg13n }, // Slight snow fall
  73: { day: svg13d, night: svg13n }, // Moderate snow fall
  75: { day: svg13d, night: svg13n }, // Heavy snow fall

  80: { day: svg09d, night: svg09n }, // Rain showers slight
  81: { day: svg09d, night: svg09n }, // Rain showers moderate
  82: { day: svg09d, night: svg09n }, // Rain showers violent

  95: { day: svg11d, night: svg11n }, // Thunderstorm
  96: { day: svg11d, night: svg11n }, // Thunderstorm with slight hail
  99: { day: svg11d, night: svg11n }, // Thunderstorm with heavy hail
};

export function getWeatherIcon(wmoCode, isDay = true) {
  const iconSet = ICON_MAP[wmoCode];
  if (!iconSet) return svg02d; // fallback: clear day
  return isDay ? iconSet.day : iconSet.night;
}
