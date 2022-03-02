function loadGames() {
  return fetch(config.GAMES_API + "?page=0&limit=100", {
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
  const listEl = document.querySelector("#games-list");
  data.forEach((game) => {
    const gameEl = document.createElement("div");
    gameEl.className = "col-sm-12 col-md-6 col-lg-4 col-xxl-3 mb-4";
    gameEl.innerHTML = `
    <div class="d-flex flex-column align-items-center">
      <img
        src="${
          config.GAMES_ASSETS_PREFIX +
          game.oplay_id +
          game.text_background_image
        }"
        class="game-img"
        alt=""
      />
    </div>
    `;
    listEl.appendChild(gameEl);
  });
});
