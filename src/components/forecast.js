import { format } from "date-fns";
import { getWeatherIcon } from "../modules/icons";
import "../css/forecast.css";
import { celsiusToFahrenheit } from "../modules/utils";

const forecast = document.querySelector(".forecast");
// for initial and error
function renderEmptyWeatherForecast() {
  const days = [1, 2, 3, 4, 5, 6];
  const html = /*html*/ `
                <h3>Weather Forecast</h3>
                <div class="forecast-card-wrapper">
                  ${days
                    .map(() => {
                      const html = /*html*/ `
                            <div class="forecast-card skeleton"></div>
                        `;
                      return html;
                    })
                    .join("")}
                </div>`;
  forecast.innerHTML = html;
}
// for weather forecast
function renderWeatherForecast(days, unit) {
  const isCelsius = unit === "c";

  const html = /*html*/ `
                <h3>Weather Forecast</h3>
                <div class="forecast-card-wrapper">
                  ${days
                    .map((day) => {
                      const tempMax = isCelsius
                        ? day.tempMax
                        : celsiusToFahrenheit(day.tempMax);
                      const tempMin = isCelsius
                        ? day.tempMin
                        : celsiusToFahrenheit(day.tempMin);
                      const html = /*html*/ `
                            <div class="forecast-card">
                                <span>${format(day.date, "EEE")}</span>
                                <img width="100px" src="${getWeatherIcon(day.weatherCode)}" alt="forecast-img" />
                                <span class="temp"><span>${tempMax}°</span>-${tempMin}°</span>
                            </div>
                        `;
                      return html;
                    })
                    .join("")}
                </div>`;
  forecast.innerHTML = html;
}
export { renderWeatherForecast, renderEmptyWeatherForecast };
