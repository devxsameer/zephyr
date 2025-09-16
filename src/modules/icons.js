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
// Map WeatherAPI condition codes to WMO codes
const WEATHER_API_TO_WMO = {
  1000: 0, // Sunny -> Clear sky
  1003: 2, // Partly cloudy
  1006: 3, // Cloudy
  1009: 3, // Overcast
  1030: 45, // Mist -> Fog
  1063: 61, // Patchy rain possible -> Slight rain
  1066: 71, // Patchy snow possible -> Slight snow
  1069: 80, // Patchy sleet possible -> Rain showers slight
  1072: 51, // Patchy freezing drizzle -> Light drizzle
  1087: 95, // Thunder possible -> Thunderstorm
  1114: 73, // Blowing snow -> Moderate snow fall
  1117: 75, // Blizzard -> Heavy snow fall
  1135: 45, // Fog
  1147: 48, // Freezing fog -> Rime fog
  1150: 51, // Patchy light drizzle -> Light drizzle
  1153: 51, // Light drizzle
  1168: 53, // Freezing drizzle -> Moderate drizzle
  1171: 55, // Heavy freezing drizzle -> Dense drizzle
  1180: 61, // Patchy light rain -> Slight rain
  1183: 61, // Light rain
  1186: 63, // Moderate rain at times
  1189: 63, // Moderate rain
  1192: 65, // Heavy rain at times
  1195: 65, // Heavy rain
  1198: 61, // Light freezing rain -> Slight rain
  1201: 63, // Heavy freezing rain -> Moderate rain
  1204: 80, // Light sleet -> Rain showers slight
  1207: 81, // Heavy sleet -> Rain showers moderate
  1210: 71, // Patchy light snow
  1213: 71, // Light snow
  1216: 73, // Patchy moderate snow
  1219: 73, // Moderate snow
  1222: 75, // Patchy heavy snow
  1225: 75, // Heavy snow
  1237: 99, // Ice pellets -> Thunderstorm w/ hail (closest)
  1240: 80, // Light rain shower
  1243: 81, // Moderate rain shower
  1246: 82, // Torrential rain shower
  1249: 80, // Light sleet showers
  1252: 81, // Moderate sleet showers
  1255: 71, // Light snow showers
  1258: 73, // Moderate snow showers
  1261: 80, // Light ice pellet showers
  1264: 81, // Heavy ice pellet showers
  1273: 95, // Light rain w/ thunder
  1276: 96, // Heavy rain w/ thunder
  1279: 95, // Light snow w/ thunder
  1282: 96, // Heavy snow w/ thunder
};

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

  80: { day: svg02d, night: svg02n }, // Rain showers slight
  81: { day: svg09d, night: svg09n }, // Rain showers moderate
  82: { day: svg09d, night: svg09n }, // Rain showers violent

  95: { day: svg11d, night: svg11n }, // Thunderstorm
  96: { day: svg11d, night: svg11n }, // Thunderstorm with slight hail
  99: { day: svg11d, night: svg11n }, // Thunderstorm with heavy hail
};

function getWeatherIcon(wmoCode, isDay = true) {
  const iconSet = ICON_MAP[wmoCode];
  if (!iconSet) return svg02d; // fallback: clear day
  return isDay ? iconSet.day : iconSet.night;
}
export function getUnifiedWeatherIcon(code, isDay = true, source = "wmo") {
  let wmoCode;

  if (source === "weatherapi") {
    wmoCode = WEATHER_API_TO_WMO[code] ?? 2; // fallback: partly cloudy
  } else {
    wmoCode = code; // already WMO from Open-Meteo
  }

  return getWeatherIcon(wmoCode, isDay);
}
