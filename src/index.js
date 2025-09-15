import "./css/fonts.css";
import "./css/main.css";
import { init } from "./modules/search";
import UI from "./ui";
window.addEventListener("DOMContentLoaded", () => {
  init();
  UI.init();
});
