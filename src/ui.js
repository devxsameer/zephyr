import {
  createIcons,
  Search,
  LoaderCircle,
  MoveUpLeft,
  Cloudy,
  CloudRain,
  MapPin,
  Link,
  Wind,
  Droplets,
  SunMedium,
} from "lucide";
import { renderHero, renderWeatherHero } from "./components/hero";
import { getGreeting, normalizeName } from "./modules/utils";
import {
  renderEmptyWeatherForecast,
  renderWeatherForecast,
} from "./components/forecast";
import {
  renderCurrentWeather,
  renderEmptyCurrentWeather,
} from "./components/current";

const UI = {
  searchLoader: document.querySelector(".search-loader"),
  loader: document.querySelector(".loader-wrapper"),
  queryList: document.querySelector(".query-list"),
  hero: document.querySelector(".hero"),
  greeting: document.querySelector(".greeting span"),
  mainContainer: document.querySelector(".main-container"),
  weatherActive: false,
  unit: "c",
  current: null,
  forecast: null,
  // initialize
  init() {
    this.greeting.innerHTML = getGreeting();
    renderHero();
    renderEmptyCurrentWeather();
    renderEmptyWeatherForecast();
    this.refreshIcons();
    this.hideLoader();
    // Adding Event Listeners
    document.querySelectorAll(".temperature-unit span").forEach((span) => {
      span.addEventListener("click", () => {
        const active = document.querySelector(".temperature-unit span.active");
        span.classList.add("active");
        this.unit = span.dataset.unit;
        if (this.weatherActive) {
          this.renderWeather(this.current, this.forecast);
        }
        active.classList.remove("active");
      });
    });
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
  // To Render Empty
  renderEmpty() {
    this.weatherActive = false;
    renderHero(false);
    renderEmptyCurrentWeather();
    renderEmptyWeatherForecast();
    this.refreshIcons();
  },
  // To Render Weather
  renderWeather(current, forecast) {
    this.weatherActive = true;
    this.current = current;
    this.forecast = forecast;
    renderWeatherHero(current, this.unit);
    renderWeatherForecast(forecast, this.unit);
    renderCurrentWeather(current);
    this.refreshIcons();
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
        Wind,
        SunMedium,
        Droplets,
      },
    });
  },
};
export default UI;
