function loadGames() {
  return fetch("https://103.242.119.222/api/games?page=0&limit=100", {
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
    gameEl.className = "col-sm-12 col-md-5 col-lg-3 mb-4";
    gameEl.innerHTML = `
    <a class="card card-block border-0">
      <img
        class="card-img"
        src="${
          "https://oneplay-assets-dev.s3.ap-south-1.amazonaws.com/game_assets_4/" +
          game.oplay_id +
          game.text_background_image
        }"
        height="153"
        width="219"
        alt=""
      />
    </a>
    `;
    listEl.appendChild(gameEl);
  });
});
