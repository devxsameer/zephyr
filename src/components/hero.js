import "../css/hero.css";
import { format } from "date-fns";
import { getWeatherIcon } from "../modules/icons";
import bgDay from "../assets/images/background-day.png";
import bgNight from "../assets/images/background-night.png";
import errorSvg from "../assets/images/error.svg";
import initialSvg from "../assets/images/hero.svg";
const hero = document.querySelector(".hero ");
// for initial and error hero
function renderHero(initial = true) {
  const html = /*html*/ `
    <div>
        <div class="hero-content">
          <img width="200px" src="${initial ? initialSvg : errorSvg}" alt="weather-svg" class="hero-svg" />
          <div class="hero-initial">
            <h3>${initial ? "Zephyr is waiting to breeze you some forecasts ✨" : "Hmm… Zephyr couldn't find that city 🌪️"}</h3>
            ${initial ? "" : `<p>Zephyr's still learning geography — maybe pick a bigger city?</p>`}
            ${
              initial
                ? `
                <div class="hero-time">
                    <span>${format(new Date(), "EEEE")},</span>
                    ${format(new Date(), "hh:mm a")}
                </div>`
                : ``
            }
          </div>
        </div>
        <div class="hero-extras">
            <div class="hero-extras-tip">
                <i data-lucide="map-pin" class="icon"></i>
                <span>Pro tip: Click the location icon to instantly see your local weather.</span>
            </div>
            <div class="hero-extras-tip">
                <i data-lucide="search" class="icon"></i>
                <span>Pro tip: Type just a few letters—Zephyr's smart search will guess the city!</span>
            </div>
        </div>
    </div>
    `;
  hero.innerHTML = html;
}
// for weather hero
function renderWeatherHero(current) {
  const locationBg = current.isDay ? `url(${bgDay})` : `url(${bgNight})`;
  const html = /*html*/ `
            <div>
                <div class="hero-content">
                    <img width="200px" src="${getWeatherIcon(
                      current.today.weatherCode,
                      current.isDay,
                    )}" alt="weather-svg" class="hero-svg" />
                    <div>
                        <div class="hero-temperature">
                            <span>${current.temperature}</span>
                            <sup>°C</sup>
                        </div>
                        <div class="hero-time">
                            <span>${format(current.localTime, "EEEE")},</span>${format(current.localTime, "hh:mm a")}
                        </div>
                    </div>
                </div>
                <div class="hero-stats">
                    <div class="hero-stats-condition">
                        <i data-lucide="cloudy" class="icon"></i>
                        <span>${current.condition}</span>
                    </div>
                    <div class="hero-stats-precipitation">
                        <i data-lucide="cloud-rain" class="icon"></i>
                        <span>Rain - ${current.today.precipitation}%</span>
                    </div>
                </div>
            </div>
            <div class='hero-location ${current.isDay ? "" : "night"}'
            style="background-image:${locationBg}">
                <span>${current.name}</span>
                <span>${current.region}, ${current.country}</span>
            </div>`;
  hero.innerHTML = html;
}
export { renderWeatherHero, renderHero };
