import { parse, getHours, parseISO, format } from "date-fns";
function round(num) {
  return Math.round(num);
}
function debounce(func, delay = 500) {
  let timeout = null;
  const debounced = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}
function getParsedDate(dateStr) {
  return parse(dateStr, "yyyy-MM-dd HH:mm", new Date());
}
function normalizeName(name) {
  return name
    .normalize("NFD") // split letters & diacritics
    .replace(/[\u0300-\u036f]/g, ""); // remove accents
}
function getGreeting() {
  const hour = getHours(new Date());

  if (hour < 12) return "Good morning 🌞";
  if (hour < 18) return "Good afternoon ☀️";
  return "Good evening 🌇";
}
function getHumidityFeedback(humidity) {
  if (humidity < 30) {
    return "Dry 💨";
  } else if (humidity < 60) {
    return "Comfortable 👍";
  } else if (humidity < 80) {
    return "Muggy 🌫️";
  } else {
    return "Humid 🌧️";
  }
}
function getWindFeedback(speed) {
  if (speed < 5) {
    return "Calm 🌿";
  } else if (speed < 20) {
    return "Breezy 🍃";
  } else if (speed < 40) {
    return "Windy 🌬️";
  } else {
    return "Stormy 🌪️";
  }
}
function getUVFeedback(uv) {
  if (uv < 3) {
    return "Low 🌑";
  } else if (uv < 6) {
    return "Moderate 🌤️";
  } else if (uv < 8) {
    return "High ☀️";
  } else if (uv < 11) {
    return "Very High 🔆";
  } else {
    return "Extreme 🛑";
  }
}
function isoToAmPmWithSub(isoString) {
  const date = parseISO(isoString);
  const time = format(date, "h:mm a"); // e.g. "9:25 AM"
  const [main, meridiem] = time.split(" "); // ["9:25", "AM"]
  return `${main} <small>${meridiem}</small>`;
}
function celsiusToFahrenheit(celsius) {
  return round((celsius * 9) / 5 + 32);
}
export {
  round,
  getParsedDate,
  normalizeName,
  getGreeting,
  getHumidityFeedback,
  getWindFeedback,
  getUVFeedback,
  isoToAmPmWithSub,
  celsiusToFahrenheit,
  debounce,
};
