import { getGeolocation, getSearchSuggestions, getWeatherData } from "./api";
import UI from "../ui";
import { debounce } from "./utils";

// DOM Variables
const searchBar = document.querySelector(".search input");
const currentLocationBtn = document.querySelector(".geolocation");
const queryList = document.querySelector(".query-list");

// Debouncing Implementation
const debouncedSearch = debounce(handleSearch, 500);

function cancelDebounce() {
  UI.clearSuggestions();
  UI.hideSearchLoader();
}
// Async Functions
async function getCurrentLocationWeather() {
  try {
    const { latitude, longitude } = await getGeolocation();
    setWeather(latitude, longitude);
  } catch (err) {
    console.error(err.message);
    UI.renderEmpty();
  }
}
async function setWeather(lat, long) {
  try {
    const data = await getWeatherData(lat, long);
    if (data.error) {
      throw new Error(data.error);
    }
    const { current, forecast } = data;
    UI.renderWeather(current, forecast);
  } catch (err) {
    console.error("No weather data:", err);
    UI.renderEmpty();
  } finally {
    searchBar.value = "";
    UI.clearSuggestions();
  }
}
async function handleEnter(query) {
  try {
    const list = await getSearchSuggestions(query);
    if (list.length) {
      setWeather(list[0].latitude, list[0].longitude);
    } else {
      throw new Error("No Results Found");
    }
  } catch (err) {
    console.error("Search failed:", err.message);
    searchBar.value = "";
    UI.renderEmpty();
  } finally {
    UI.clearSuggestions();
  }
}
async function handleSearch(query) {
  UI.showSearchLoader();
  const currentQuery = query; // Track query that triggered this call
  try {
    const list = await getSearchSuggestions(query);
    if (searchBar.value.trim() !== currentQuery) return;
    if (list.length) {
      UI.renderSuggestions(list);
    } else {
      UI.clearSuggestions();
    }
  } catch (err) {
    console.error("Search failed:", err.message);
  } finally {
    UI.hideSearchLoader();
  }
}
// Initialize Everything
function init() {
  // Render Suggestions While Typing
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (!query) {
      cancelDebounce();
      return;
    }
    debouncedSearch(query);
  });

  // Fetch Current Weather on Btn Click
  currentLocationBtn.addEventListener("click", getCurrentLocationWeather);

  // Render Weather On Enter
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        debouncedSearch.cancel?.();
        handleEnter(query);
      }
    }
  });

  // Handle Suggestion Click
  queryList.addEventListener("click", (e) => {
    const queryLi = e.target.closest(".query-list-item");
    if (!queryLi) return;
    const { latitude, longitude } = queryLi.dataset;
    if (latitude && longitude) setWeather(latitude, longitude);
  });
}
export { init, getCurrentLocationWeather };
