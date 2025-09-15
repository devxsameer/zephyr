import { parse, getHours } from "date-fns";
function round(num) {
  return Math.round(num);
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
export { round, getParsedDate, normalizeName, getGreeting };
