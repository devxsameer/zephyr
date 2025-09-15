import "../css/current.css";

const current = document.querySelector(".current");
// for weather forecast
function renderCurrentWeather(days) {
  console.log(days);

  const html = /*html*/ `
                <h3>Today's Highlights</h3>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iusto illo, vel officia placeat inventore quod provident dolores ea laudantium aperiam deleniti quam nulla necessitatibus consequatur aut odit pariatur atque sunt veniam dolore.</p>
                `;
  current.innerHTML = html;
}
export { renderCurrentWeather };
