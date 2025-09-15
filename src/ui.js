import {
  createIcons,
  Search,
  LoaderCircle,
  MoveUpLeft,
  Cloudy,
  CloudRain,
  MapPin,
  Link,
} from "lucide";
import { renderWeatherHero } from "./components/hero";
import { getGreeting, normalizeName } from "./modules/utils";
import { renderWeatherForecast } from "./components/forecast";
import { renderCurrentWeather } from "./components/current";

const UI = {
  searchLoader: document.querySelector(".search-loader"),
  loader: document.querySelector(".loader-wrapper"),
  queryList: document.querySelector(".query-list"),
  hero: document.querySelector(".hero"),
  greeting: document.querySelector(".greeting span"),
  // initialize
  init() {
    this.greeting.innerHTML = getGreeting();
  },
  // For SearchBar
  renderSuggestions(list) {
    const queryListHtml = list
      .map((query) => {
        return /*html*/ `
        <li class="query-list-item" data-latitude="${query.latitude}" data-longitude="${query.longitude}">
          <i class="icon" data-lucide="move-up-left"></i>
          <span>${normalizeName(query.name)}, ${query.admin1}, ${query.country}</span>
        </li>
      `;
      })
      .join("");
    this.queryList.innerHTML = queryListHtml;
    this.refreshIcons();
  },
  // To Render Weather
  renderWeather(current, forecast) {
    renderWeatherHero(current);
    renderWeatherForecast(forecast);
    renderCurrentWeather(current);
    this.refreshIcons();
    console.log(forecast);
  },
  clearSuggestions() {
    this.queryList.innerHTML = "";
  },
  // Search Loader
  showLoader() {
    this.loader.classList.remove("hidden");
  },
  hideLoader() {
    this.loader.classList.add("hidden");
  },
  // Search Loader
  showSearchLoader() {
    this.searchLoader.classList.add("active");
  },
  hideSearchLoader() {
    this.searchLoader.classList.remove("active");
  },
  // For Skeletons
  showSkeletons() {
    this.hero.classList.add("skeleton-active");
  },
  hideSkeletons() {
    this.hero.classList.remove("skeleton-active");
  },
  // Refresh Icons
  refreshIcons() {
    createIcons({
      icons: {
        Search,
        LoaderCircle,
        MoveUpLeft,
        Cloudy,
        CloudRain,
        MapPin,
        Link,
      },
    });
  },
};
export default UI;
