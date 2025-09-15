import "./css/fonts.css";
import "./css/main.css";
import { init } from "./modules/search";
import UI from "./ui";
import { renderHero } from "./components/hero";
window.addEventListener("DOMContentLoaded", () => {
  init();
  renderHero();
  UI.init();
  UI.hideLoader();
  UI.refreshIcons();
});
