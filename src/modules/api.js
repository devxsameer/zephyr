import { getParsedDate, round } from "./utils";

const API_KEY = "5c6747323f77495eb1820754250509";
// ------------------ Geolocation ------------------
async function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(
          new Error(
            `Geolocation error: ${error.message} (code: ${error.code})`,
          ),
        );
      },
    );
  });
}
// ------------------ Search Suggestions ------------------
async function getSearchSuggestions(query) {
  if (!query || query.trim() === "") return [];

  const url = "https://geocoding-api.open-meteo.com/v1/search";
  const params = new URLSearchParams({
    name: query,
    count: 5,
    language: "en",
  });

  try {
    const response = await fetch(`${url}?${params}`);
    if (response.status !== 200) {
      throw new Error(
        `Failed to Get Search Suggestions (status: ${response.status})`,
      );
    }
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error("Fetching Error:", err.message);
    return [];
  }
}
// ------------------ Data Normalization ------------------
function filterWeatherData(currentWeather, forecastWeather) {
  const daily = forecastWeather?.daily || {};
  const days = (daily.time || []).map((date, index) => ({
    date,
    tempMax: round(daily.temperature_2m_max?.[index] ?? 0),
    tempMin: round(daily.temperature_2m_min?.[index] ?? 0),
    sunrise: daily.sunrise?.[index] ?? "",
    sunset: daily.sunset?.[index] ?? "",
    weatherCode: daily.weather_code?.[index] ?? 0,
    precipitation: daily.precipitation_probability_mean?.[index] ?? 0,
  }));
  const forecast = days.slice(1); // rest of the week
  const today = days[0] || {};

  const current = {
    condition: currentWeather?.current?.condition?.text || "Unknown",
    code: currentWeather?.current?.condition?.code || "1000",
    isDay: currentWeather?.current?.is_day ?? 1,
    windSpeed: currentWeather?.current?.wind_kph ?? 0,
    humidity: currentWeather?.current?.humidity ?? 0,
    uv: currentWeather?.current?.uv ?? 0,
    cloud: currentWeather?.current?.cloud ?? 0,
    name: currentWeather?.location?.name || "Unknown",
    localTime: getParsedDate(currentWeather?.location?.localtime || ""),
    region: currentWeather?.location?.region || "",
    country: currentWeather?.location?.country || "",
    temperature: round(currentWeather?.current?.temp_c ?? 0),
    today,
  };
  return { current, forecast };
}

// ------------------ Weather Data ------------------
async function getWeatherData(lat, long) {
  if (!lat || !long) return { error: "Invalid coordinates" };

  const currentWeatherURL = "https://api.weatherapi.com/v1/current.json";
  const forecastURL = "https://api.open-meteo.com/v1/forecast";

  const params = new URLSearchParams({
    latitude: lat,
    longitude: long,
    timezone: "auto",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunrise,sunset",
  });

  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(`${currentWeatherURL}?key=${API_KEY}&q=${lat},${long}`, {
        mode: "cors",
      }),
      fetch(`${forecastURL}?${params}`),
    ]);

    if (!currentWeatherResponse.ok) {
      throw new Error(
        `Failed to get current weather (status: ${currentWeatherResponse.status})`,
      );
    }
    if (!forecastResponse.ok) {
      throw new Error(
        `Failed to get forecast (status: ${forecastResponse.status})`,
      );
    }

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();
    console.log(currentWeatherData);
    console.log(forecastData);

    return filterWeatherData(currentWeatherData, forecastData);
  } catch (err) {
    console.error("Fetching Error:", err.message);
    return { error: err.message };
  }
}
export { getWeatherData, getSearchSuggestions, getGeolocation };
