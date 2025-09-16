import "../css/current.css";
import sunriseSvg from "../assets/images/sunrise.svg";
import sunsetSvg from "../assets/images/sunset.svg";
import {
  getHumidityFeedback,
  getUVFeedback,
  getWindFeedback,
  isoToAmPmWithSub,
} from "../modules/utils";

const current = document.querySelector(".current");
// for empty
function renderEmptyCurrentWeather() {
  const html = /*html*/ `
                <h3>Today's Highlights</h3>
                <div class="current-card-wrapper">
                    <div class="wind-status current-card skeleton"></div>
                    <div class="humidity current-card skeleton"></div>
                    <div class="uv-index current-card skeleton"></div>
                    <div class="cloud-cover current-card skeleton"></div>
                    <div class="sunrise current-card skeleton"></div>
                    <div class="sunset current-card skeleton"></div>
                </div>`;
  current.innerHTML = html;
}
// for weather forecast
function renderCurrentWeather(data) {
  const html = /*html*/ `
                <h3>Today's Highlights</h3>
                <div class="current-card-wrapper">
                    <div class="wind-status current-card">
                        <span class="current-card-heading">
                            <i data-lucide="wind" class="icon"></i>
                            Wind Status
                        </span>
                        <span class="current-card-main">
                            <span>${data.windSpeed}</span>
                            km/h
                        </span>
                        <p>${getWindFeedback(data.windSpeed)}</p>
                    </div>
                    <div class="humidity current-card">
                        <span class="current-card-heading">
                            <i data-lucide="droplets" class="icon"></i>
                            Humidity
                        </span>
                        <span class="current-card-main">
                            <span>${data.humidity}</span>
                            %
                        </span>
                        <p>${getHumidityFeedback(data.humidity)}</p>
                    </div>
                    <div class="uv-index current-card">
                        <span class="current-card-heading">
                            <i data-lucide="sun-medium" class="icon"></i>
                            UV Index
                        </span>
                        <span class="current-card-main">
                            <span>${data.uv}</span>
                            UV
                        </span>
                        <p>${getUVFeedback(data.uv)}</p>
                    </div>
                    <div class="cloud-cover current-card">
                        <span class="current-card-heading">
                            <i data-lucide="cloudy" class="icon"></i>
                            Cloud Cover
                        </span>
                        <span class="current-card-main">
                            <span>${data.cloud}</span>
                            %
                        </span>
                    </div>
                    <div class="sunrise current-card">
                        <img width="50px" src="${sunriseSvg}" alt="sunrise-img" srcset="">
                        <div class="current-card-special">
                            <span class="current-card-heading">
                                Sunrise
                            </span>
                            <span class="current-card-main">
                                <span>${isoToAmPmWithSub(data.today.sunrise)}</span>
                            </span>
                        </div>
                    </div>
                    <div class="sunset current-card">
                        <img width="50px" src="${sunsetSvg}" alt="sunrise-img" srcset="">
                        <div class="current-card-special">
                            <span class="current-card-heading">
                                Sunset
                            </span>
                            <span class="current-card-main">
                                <span>${isoToAmPmWithSub(data.today.sunset)}</span>
                            </span>
                        </div>
                    </div>
                </div>
                `;
  current.innerHTML = html;
}
export { renderCurrentWeather, renderEmptyCurrentWeather };
