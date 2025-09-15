import { format } from "date-fns";
import { getWeatherIcon } from "../modules/icons";
import "../css/forecast.css";

const forecast = document.querySelector(".forecast");
// for weather forecast
function renderWeatherForecast(days) {
  console.log(days);

  const html = /*html*/ `
                <h3>Weather Forecast</h3>
                <div class="forecast-card-wrapper">
                    ${days
                      .map((day) => {
                        const html = /*html*/ `
                            <div class="forecast-card">
                                <span>${format(day.date, "EEE")}</span>
                                <img width="100px" src="${getWeatherIcon(day.weatherCode)}" alt="forecast-img" />
                                <span class="temp"><span>${day.tempMax}°</span>-${day.tempMin}°</span>
                            </div>
                        `;
                        return html;
                      })
                      .join("")}
                </div>`;
  forecast.innerHTML = html;
}
export { renderWeatherForecast };
