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
  searchLoader: document.querySelector(".search-loader") ?? null,
  loader: document.querySelector(".loader-wrapper") ?? null,
  queryList: document.querySelector(".query-list") ?? null,
  hero: document.querySelector(".hero") ?? null,
  greeting: document.querySelector(".greeting span") ?? null,
  mainContainer: document.querySelector(".main-container") ?? null,

  weatherActive: false,
  unit: localStorage.getItem("unit") || "c", // persist unit
  current: null,
  forecast: null,

  // initialize
  init() {
    if (this.greeting) this.greeting.innerHTML = getGreeting();

    renderHero();
    renderEmptyCurrentWeather();
    renderEmptyWeatherForecast();
    this.refreshIcons();
    this.hideLoader();
    // Adding Active class
    document
      .querySelector(`[data-unit="${this.unit}"]`)
      .classList.add("active");
    // Event Listeners for unit toggle
    document.querySelectorAll(".temperature-unit span").forEach((span) => {
      span.addEventListener("click", () => {
        if (span.classList.contains("active")) return; // skip if already active

        const active = document.querySelector(".temperature-unit span.active");
        span.classList.add("active");
        this.unit = span.dataset.unit;
        localStorage.setItem("unit", this.unit); // persist choice

        if (this.weatherActive) {
          this.renderWeather(this.current, this.forecast);
        }
        active.classList.remove("active");
      });
    });
  },

  // Render search suggestions
  renderSuggestions(list) {
    if (!this.queryList) return;

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
    if (this.queryList) this.queryList.innerHTML = "";
  },

  // Global Loader
  showLoader() {
    this.loader?.classList.remove("hidden");
  },
  hideLoader() {
    this.loader?.classList.add("hidden");
  },

  // Search Loader
  showSearchLoader() {
    this.searchLoader?.classList.add("active");
  },
  hideSearchLoader() {
    this.searchLoader?.classList.remove("active");
  },

  // Refresh Lucide Icons
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
