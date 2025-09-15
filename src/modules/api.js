import { getParsedDate, round } from "./utils";

const API_KEY = "5c6747323f77495eb1820754250509";
// To get Geolocation
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
// To get Search Suggestions
async function getSearchSuggestions(query) {
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
    console.log(data.results);
    return data.results || null;
  } catch (err) {
    console.error("Fetching Error:", err.message);
    return null;
  }
}
function filterWeatherData(currentWeather, forecastWeather) {
  // Forecast Weather
  const daily = forecastWeather.daily;
  const days = daily.time.map((date, index) => ({
    date,
    tempMax: round(daily.temperature_2m_max[index]),
    tempMin: round(daily.temperature_2m_min[index]),
    weatherCode: daily.weather_code[index],
    precipitation: daily.precipitation_probability_mean[index],
  }));
  const forecast = days.slice(1); // rest of the week
  // Current Weather
  const today = days[0]; // first day separately
  const current = {
    condition: currentWeather.current.condition.text,
    isDay: currentWeather.current.is_day,
    name: currentWeather.location.name,
    localTime: getParsedDate(currentWeather.location.localtime),
    region: currentWeather.location.region,
    country: currentWeather.location.country,
    temperature: round(currentWeather.current.temp_c),
    today: today,
  };
  return { current, forecast };
}
async function getWeatherData(lat, long) {
  const currentWeatherURL = "https://api.weatherapi.com/v1/current.json";
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: lat,
    longitude: long,
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean",
  });
  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(`${currentWeatherURL}?key=${API_KEY}&q=${lat},${long}`, {
        mode: "cors",
      }),
      fetch(`${url}?${params}`),
    ]);
    if (currentWeatherResponse.status !== 200) {
      throw new Error(
        `Failed To Get Current Weather (status: ${currentWeatherResponse.status})`,
      );
    }
    if (forecastResponse.status !== 200) {
      throw new Error(
        `Failed To Get Forecast (status: ${forecastResponse.status})`,
      );
    }
    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();
    if (currentWeatherData && forecastData) {
      console.dir(currentWeatherData);
      console.dir(forecastData);
      return filterWeatherData(currentWeatherData, forecastData);
    } else {
      return null;
    }
  } catch (err) {
    console.error("Fetching Error:", err.message);
    return null;
  }
}
export { getWeatherData, getSearchSuggestions, getGeolocation };
