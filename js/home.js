import { config } from "./config";

function loadGames() {
  return fetch(config.GAMES_API + "?page=0&limit=90", {
    headers: {
      "content-type": "application/json",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "omit",
  })
    .then((res) => res.json())
    .then((data) => data);
}

loadGames().then((data) => {
  [1, 2, 3].forEach((page) => {
    const listEl = document.querySelector("#swiper" + page);
    const start = (page - 1) * 30;
    const end = start + 30;
    data.slice(start, end).forEach((game) => {
      const gameEl = document.createElement("div");
      gameEl.className = "swiper-slide";
      gameEl.innerHTML = `
      <img src="${
        config.GAMES_ASSETS_PREFIX +
        game.oplay_id +
        game.text_background_image
      }" class="img-list" alt="" />
    `;
      listEl.appendChild(gameEl);
    });
  });
});
